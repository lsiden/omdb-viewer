// Remote Actions

/* eslint-disable no-console */

import toastr from "toastr"

import {
  updateFilms,
  appendFilms,
  updateFilmDetails,
  updateIsFetching,
} from "./"
import store from "actions/store"

function toJson(res) {
  try {
    return res.json()
  } catch (e) {
    return Promise.reject(e)
  }
}

export const queryFetch = query => dispatch =>
  fetch(`https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}`)
    .then(res => toJson(res))
    .then(res => dispatch(updateFilms(query, res.Search)))
    .catch(e => {
      console.error(e)
      toastr.error(e, "An error occured")
    })

export const pageFetch = () => dispatch => {
  const { query, pageNum = 1 } = store.getState()
  const nextPageNum = pageNum + 1
  dispatch(updateIsFetching(true))
  return fetch(
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}&page=${nextPageNum}`
  )
    .then(res => toJson(res))
    .then(res => {
      dispatch(updateIsFetching(false))
      dispatch(appendFilms(nextPageNum, res.Search))
    })
    .catch(e => {
      dispatch(updateIsFetching(false))
      console.error(e)
      toastr.error(e, "An error occured")
    })
}

export const fetchFilmDetails = id => dispatch =>
  fetch(`https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&i=${id}&plot=full`)
    .then(res => toJson(res))
    .then(res => dispatch(updateFilmDetails(res)))
    .catch(e => {
      console.error(e)
      toastr.error(e, "An error occured")
    })
