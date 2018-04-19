// Remote Actions

/* eslint-disable no-console */

import toastr from "toastr"
import AbortController from "abort-controller"

import {
  updateFilms,
  appendFilms,
  updateFilmDetails,
  updateIsFetching,
} from "./"
import store from "actions/store"

const FETCH_TIMEOUT = 5000
const abortController = new AbortController()

function toJson(res) {
  try {
    return res.json()
  } catch (e) {
    return Promise.reject(e)
  }
}

const onCatch = e => {
  console.error(e)
  toastr.error(e, "An error occured")
}

// Returns Promise that resolves to fetch result if successful
const fetchWithTimeout = (dispatch, uri) => {
  let timeout
  const timeoutPromise = new Promise((resolve, reject) => {
    timeout = setTimeout(() => {
      abortController.abort()
      reject(
        new Error(
          "Unable to fetch data. Try a different title or try again later."
        )
      )
    }, FETCH_TIMEOUT)
  })
  const fetchPromise = fetch(uri, {
    signal: abortController.signal,
  })
  dispatch(updateIsFetching(true))
  return Promise.race([timeoutPromise, fetchPromise])
    .then(res => toJson(res))
    .finally(() => {
      clearTimeout(timeout)
      dispatch(updateIsFetching(false))
    })
    .catch(onCatch)
}

// Returns a Promise
export const queryFetch = query => dispatch => {
  return fetchWithTimeout(
    dispatch,
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}`
  ).then(res => dispatch(updateFilms(query, (res || {}).Search || [])))
}

// Returns a Promise
export const pageFetch = () => dispatch => {
  const { query, pageNum = 1 } = store.getState()
  const nextPageNum = pageNum + 1
  return fetchWithTimeout(
    dispatch,
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}&page=${nextPageNum}`
  ).then(res => dispatch(appendFilms(nextPageNum, (res || {}).Search || [])))
}

// Returns a Promise
export const fetchFilmDetails = id => dispatch => {
  return fetchWithTimeout(
    dispatch,
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&i=${id}&plot=full`
  ).then(res => dispatch(updateFilmDetails(res)))
}
