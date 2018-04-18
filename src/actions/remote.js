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
const fetchWithTimeout = uri => {
  const onFetchTimeout = msg => {
    console.warn("timeout, aborting.")
    abortController.abort()
    // TODO style this
    toastr.warning(msg)
  }

  const timeout = setTimeout(
    () =>
      onFetchTimeout(
        "Unable to fetch data. Try a different title or try again later."
      ),
    FETCH_TIMEOUT
  )
  return fetch(uri).then(res => {
    clearTimeout(timeout)
    return toJson(res)
  })
}

const onCatch = e => {
  console.error(e)
  toastr.error(e, "An error occured")
}

export const queryFetch = query => dispatch => {
  dispatch(updateIsFetching(true))
  return fetchWithTimeout(
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}`
  )
    .then(res => {
      dispatch(updateFilms(query, res.Search))
    })
    .catch(onCatch)
    .finally(() => dispatch(updateIsFetching(false)))
}

export const pageFetch = () => dispatch => {
  const { query, pageNum = 1 } = store.getState()
  const nextPageNum = pageNum + 1
  dispatch(updateIsFetching(true))
  return fetchWithTimeout(
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}&page=${nextPageNum}`
  )
    .then(res => {
      dispatch(appendFilms(nextPageNum, res.Search))
    })
    .catch(onCatch)
    .finally(() => dispatch(updateIsFetching(false)))
}

export const fetchFilmDetails = id => dispatch => {
  dispatch(updateIsFetching(true))
  return fetchWithTimeout(
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&i=${id}&plot=full`
  )
    .then(res => {
      dispatch(updateFilmDetails(res))
    })
    .catch(onCatch)
    .finally(() => dispatch(updateIsFetching(false)))
}
