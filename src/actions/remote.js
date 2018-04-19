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

// Returns Promise that resolves to fetch result
// TODO filter duplicate ids
const fetchWithTimeout = (uri, dispatch) => {
  let timeout
  const timeoutPromise = new Promise((resolve, reject) => {
    timeout = setTimeout(() => {
      abortController.abort()
      reject("Timed out")
      // TODO style this
      toastr.warning(
        "Unable to fetch data. Try a different title or try again later."
      )
      console.warn("timeout, aborting.")
    }, FETCH_TIMEOUT)
  })
  const fetchPromise = fetch(uri, {
    signal: abortController.signal,
  })
  dispatch(updateIsFetching(true))
  return Promise.race([timeoutPromise, fetchPromise])
    .then(res => toJson(res))
    .catch(onCatch)
    .finally(() => {
      clearTimeout(timeout)
      dispatch(updateIsFetching(false))
    })
}

const onCatch = e => {
  console.error(e)
  toastr.error(e, "An error occured")
}

export const queryFetch = query => dispatch => {
  return fetchWithTimeout(
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}`,
    dispatch
  ).then(res => {
    dispatch(updateFilms(query, res.Search))
  })
}

export const pageFetch = () => dispatch => {
  const { query, pageNum = 1 } = store.getState()
  const nextPageNum = pageNum + 1
  return fetchWithTimeout(
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}&page=${nextPageNum}`,
    dispatch
  ).then(res => {
    dispatch(appendFilms(nextPageNum, res.Search))
  })
}

export const fetchFilmDetails = id => dispatch => {
  return fetchWithTimeout(
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&i=${id}&plot=full`,
    dispatch
  ).then(res => {
    dispatch(updateFilmDetails(res))
  })
}
