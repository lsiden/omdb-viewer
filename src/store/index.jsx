import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import ActionType from './const'
import reduce from './reducers'

// Action factories

export const setQuery = (query='') => ({
  type: ActionType.SET_QUERY,
  data: { query },
})

export const replaceFilms = (query='', films=[], totalResults=0) => ({
  type: ActionType.REPLACE_FILMS,
  data: { films, query, totalResults, pageNum: 1 },
})

export const appendFilms = (pageNum=1, films=[]) => ({
  type: ActionType.APPEND_FILMS,
  data: { films, pageNum },
})

export const updateFilmDetails = (filmDetails) => ({
  type: ActionType.UPDATE_FILM_DETAILS,
  data: { filmDetails },
})

export const setFetching = (isFetching=false) => ({
  type: ActionType.UPDATE_IS_FETCHING,
  data: { isFetching }
})

/// //////////////
// State Accessors

export function getFilms(state) {
  return Object.values(state.films || {})
}

/// /////////////
// Redux Store

const initialState = () => {
  const match = /^\/search\/([^/?]*)/.exec(decodeURI(window.location.pathname))
  return {
    isFetching: false,
    films: [],
    totalResults: 0,
    query: match ? match[1] : '',
  }
}

export default configureStore({
  reducer: reduce,
  preloadedState: initialState(),
  middleware: [...getDefaultMiddleware()],
})
