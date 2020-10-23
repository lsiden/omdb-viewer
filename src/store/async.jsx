// Remote Actions

import toastr from 'toastr'
// import promiseFinally from 'promise.prototype.finally'

import store from 'store'
import { FETCH_TIMEOUT, OMDB_API_URL, OMDB_API_KEY } from 'omdb_constants'
import {
  replaceFilms,
  appendFilms,
  updateFilmDetails,
  setFetching,
} from '.'

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

export const promiseQueryResults = (query) => (dispatch) => promiseFetchOrTimeout(
  dispatch, queryFetchUri(query)
).then((res={ Search: [], totalResults: 0 }) => dispatch(replaceFilms(
  query, res.Search, res.totalResults
)))

export const promiseQueryPageFetch = () => (dispatch) => {
  const { query='', pageNum=1 } = store.getState()
  const nextPageNum = pageNum + 1
  return promiseFetchOrTimeout(dispatch, pageFetchUri(query, nextPageNum))
    .then((res={ Search: [], totalResults: 0 }) => {
      dispatch(appendFilms(nextPageNum, res.Search))
    })
}

export const promiseFilmDetails = (id) => (dispatch) => promiseFetchOrTimeout(
  dispatch,
  filmFetchUri(id),
).then((res) => dispatch(updateFilmDetails(res)))
