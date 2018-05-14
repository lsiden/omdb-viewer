// Remote Actions

/* eslint-disable no-console */

import toastr from "toastr"
import promiseFinally from "promise.prototype.finally"

import {
  updateFilms,
  appendFilms,
  updateFilmDetails,
  updateIsFetching,
} from "./"
import store from "actions/store"
import { FETCH_TIMEOUT } from "../constants"

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

const onCatch = e => {
  console.error(e)
  toastr.error(e, "An error occured", {
    preventDuplicates: true,
  })
}

// Returns Promise that resolves to fetch result if successful
const fetchWithTimeout = (dispatch, uri) => {
  let timeout
  const timeoutPromise = new Promise((resolve, reject) => {
    timeout = setTimeout(() => {
      reject(
        new Error(
          "Unable to fetch data. Try a different title or try again later."
        )
      )
    }, FETCH_TIMEOUT)
  })
  dispatch(updateIsFetching(true))
  return Promise.race([timeoutPromise, fetch(uri)])
    .then(toJson)
    .catch(onCatch)
    .finally(() => {
      clearTimeout(timeout)
      dispatch(updateIsFetching(false))
    })
}

let cancelPrevQueryFetch = () => {}
class FetchCancelledError extends Error {}

export const queryFetch = query => dispatch => {
  cancelPrevQueryFetch()

  return new Promise((resolve, reject) => {
    cancelPrevQueryFetch = () =>
      reject(new FetchCancelledError(`query "${query}" cancelled`))

    return fetchWithTimeout(
      dispatch,
      `https://www.omdbapi.com?apikey=fbfcb8c7&type=movie&s=${query}`
    ).then((res = {}) => {
      if (res.Response === "False") {
        return dispatch(updateFilms(query, []))
      }
      return dispatch(updateFilms(query, res.Search || []))
    })
  }).catch(console.error)
}

// Returns a Promise
export const pageFetch = () => dispatch => {
  const { query, pageNum = 1 } = store.getState()
  const nextPageNum = pageNum + 1
  return fetchWithTimeout(
    dispatch,
    `https://www.omdbapi.com?apikey=fbfcb8c7&type=movie&s=${query}&page=${nextPageNum}`
  ).then(res => dispatch(appendFilms(nextPageNum, (res || {}).Search || [])))
}

// Returns a Promise
export const fetchFilmDetails = id => dispatch => {
  return fetchWithTimeout(
    dispatch,
    `https://www.omdbapi.com?apikey=fbfcb8c7&type=movie&i=${id}&plot=full`
  ).then(res => dispatch(updateFilmDetails(res)))
}
