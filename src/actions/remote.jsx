// Remote Actions

import toastr from 'toastr'
// import promiseFinally from 'promise.prototype.finally'

import store from 'actions/store'
import { FETCH_TIMEOUT, OMDB_API_URL, OMDB_API_KEY } from 'omdb_constants'
import {
  updateFilms,
  appendFilms,
  updateFilmDetails,
  setFetching,
} from '.'

// promise.prototoype.finally is not yet available in node.js.
// This prevents tests from breaking.
// It is a no-op when .finally() is already defined.
// promiseFinally.shim()

function toJson(res) {
  try {
    return res.json()
  } catch (e) {
    return Promise.reject(e)
  }
}

const onCatch = (e) => {
  console.error(e)
  toastr.error(e, 'An error occured', {
    preventDuplicates: true,
  })
}

// Returns Promise that resolves to fetched result if successful
const fetchWithTimeout = (dispatch, uri) => {
  let timeout
  const timeoutPromise = new Promise((_, reject) => {
    timeout = setTimeout(() => {
      reject(
        new Error(
          'Unable to fetch data. Try a different title or try again later.',
        ),
      )
    }, FETCH_TIMEOUT)
  })
  dispatch(setFetching(true))
  return Promise.race([timeoutPromise, fetch(uri)])
    .then(toJson)
    .catch(onCatch)
    .finally(() => {
      clearTimeout(timeout)
      dispatch(setFetching(false))
    })
}

const queryFetchUri = (query) => `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&type=movie&s=${query}`
const pageFetchUri = (query, page) => queryFetchUri(query) + `&page=${page}`
const filmFetchUri = (id) => `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&type=movie&i=${id}&plot=full`

// Returns a Promise
export const queryFetch = (query) => (dispatch) => {
  return fetchWithTimeout(dispatch, queryFetchUri(query))
  .then((res={ Search: [], totalResults: 0 }) => {
    return dispatch(updateFilms(query, res.Search, res.totalResults))
  })
}

// Returns a Promise
export const pageFetch = () => (dispatch) => {
  const { query, pageNum=1 } = store.getState()
  const nextPageNum = pageNum + 1
  return fetchWithTimeout(dispatch, pageFetchUri(query, nextPageNum))
  .then((res={ Search: [], totalResults: 0 }) => {
    dispatch(appendFilms(nextPageNum, res.Search))
  })
}

// Returns a Promise
export const fetchFilmDetails = (id) => (dispatch) => fetchWithTimeout(
  dispatch,
  filmFetchUri(id),
).then((res) => dispatch(updateFilmDetails(res)))
