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

const queryFetchUri = (query) => `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&type=movie&s=${query}`
const pageFetchUri = (query, page) => queryFetchUri(query) + `&page=${page}`
const filmFetchUri = (id) => `${OMDB_API_URL}?apikey=${OMDB_API_KEY}&type=movie&i=${id}&plot=full`

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
const promiseFetchOrTimeout = (dispatch, uri, millisec=FETCH_TIMEOUT) => {
  let timeout
  const timeoutPromise = new Promise((_, reject) => {
    timeout = setTimeout(() => {
      reject(
        new Error(
          'Unable to fetch data. Try a different title or try again later.',
        ),
      )
    }, millisec)
  })
  dispatch(setFetching(true))
  return Promise.race([fetch(uri), timeoutPromise])
    .then(toJson)
    .catch(onCatch)
    .finally(() => {
      clearTimeout(timeout)
      dispatch(setFetching(false))
    })
}

// Returns a Promise
export const promiseQueryResults = (query) => (dispatch) => promiseFetchOrTimeout(
  dispatch, queryFetchUri(query)
).then((res={ Search: [], totalResults: 0 }) => dispatch(updateFilms(
  query, res.Search, res.totalResults
)))

// Returns a Promise
// TODO - can this be combined with promoseQueryResults?
export const promiseQueryPageFetch = () => (dispatch) => {
  const { query, pageNum=1 } = store.getState()
  const nextPageNum = pageNum + 1
  return promiseFetchOrTimeout(dispatch, pageFetchUri(query, nextPageNum))
    .then((res={ Search: [], totalResults: 0 }) => {
      dispatch(appendFilms(nextPageNum, res.Search))
    })
}

// Returns a Promise
export const promiseFilmDetails = (id) => (dispatch) => promiseFetchOrTimeout(
  dispatch,
  filmFetchUri(id),
).then((res) => dispatch(updateFilmDetails(res)))
