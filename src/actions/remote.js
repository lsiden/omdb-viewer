// Remote Actions

import toastr from "toastr"

import { updateFilms, appendFilms, updateFilmDetails } from "./"
import store from "actions/store"

export const queryFetch = query => dispatch =>
  fetch(`https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}`)
    .then(res => res.json())
    .then(res => dispatch(updateFilms(query, res.Search)))
    .catch(e => {
      console.error(e)
      toastr.error(e, "An error occured")
    })

export const pageFetch = () => dispatch => {
  const { query, pageNum = 1 } = store.getState()
  return fetch(
    `https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}&page=${pageNum}`
  )
    .then(res => res.json())
    .then(res => dispatch(appendFilms(pageNum + 1, res.Search)))
    .catch(e => {
      console.error(e)
      toastr.error(e, "An error occured")
    })
}

export const fetchFilmDetails = id => dispatch =>
  fetch(`https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&i=${id}&plot=full`)
    .then(res => res.json())
    .then(res => dispatch(updateFilmDetails(res)))
    .catch(e => {
      console.error(e)
      toastr.error(e, "An error occured")
    })
