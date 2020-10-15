// Remote Actions

import toastr from 'toastr'
import promiseFinally from 'promise.prototype.finally'

import store from 'actions/store'
import { FETCH_TIMEOUT } from 'omdb_constants'
import {
  updateFilms,
  appendFilms,
  updateFilmDetails,
  setFetching,
} from '.'

// promise.prototoype.finally is not yet available in node.js.
// This prevents tests from breaking.
// It is a no-op when .finally() is already defined.
promiseFinally.shim()

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

// Returns Promise that resolves to fetch result if successful
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

class FetchCancelledError extends Error {
  constructor() {
    super()
    this.ignore = true
  }
}

let cancelPrevQueryFetch = () => {}

export const queryFetch = (query) => (dispatch) => {
  cancelPrevQueryFetch()

  return new Promise((resolve) => {
    cancelPrevQueryFetch = (_, reject) => {
      reject(new FetchCancelledError(`query "${query}" was cancelled`))
      dispatch(setFetching(false))
    }

    return fetchWithTimeout(
      dispatch,
      `https://www.omdbapi.com?apikey=fbfcb8c7&type=movie&s=${query}`,
    ).then((res = {}) => {
      if (res && res.Search && res.Search.length) {
        return resolve(
          dispatch(updateFilms(query, res.Search, res.totalResults)),
        )
      }
      return resolve(dispatch(updateFilms(query, [], 0)))
    })
  })
    .catch((e) => {
      if (!e.ignore) {
        console.error(e)
      }
    })
    .finally(() => {
      cancelPrevQueryFetch = () => {}
    })
}

// Returns a Promise
export const pageFetch = () => (dispatch) => {
  const { query, pageNum = 1 } = store.getState()
  const nextPageNum = pageNum + 1
  return fetchWithTimeout(
    dispatch,
    `https://www.omdbapi.com?apikey=fbfcb8c7&type=movie&s=${query}&page=${nextPageNum}`,
  ).then((res) => {
    if (res && res.Search && res.Search.length) {
      dispatch(appendFilms(nextPageNum, res.Search))
    }
  })
}

// Returns a Promise
export const fetchFilmDetails = (id) => (dispatch) => fetchWithTimeout(
  dispatch,
  `https://www.omdbapi.com?apikey=fbfcb8c7&type=movie&i=${id}&plot=full`,
).then((res) => dispatch(updateFilmDetails(res)))
