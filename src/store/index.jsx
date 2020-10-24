import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import debounce from 'lodash/debounce'

import ActionType from './const'
import reduce from './reducers'
import { promiseQueryResults } from 'store/async'

// Action factories

const _setQuery = (query='') => ({
  type: ActionType.SET_QUERY,
  data: { query },
})

export const replaceFilms = (query='', films=[], totalResults=0) => ({
  type: ActionType.REPLACE_FILMS,
  data: { films, query, totalResults, pageNum: 1 },
})

export const setQuery = (query='') => dispatch => {
  const debouncedDispatchPromiseQueryResults = debounce(
    (query) => dispatch(promiseQueryResults(query)),
    300
  )
  dispatch(_setQuery(query))

  if (!query) {
    return dispatch(replaceFilms([]))
  }
  return debouncedDispatchPromiseQueryResults(query)
}

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
  return {
    isFetching: false,
    films: [],
    totalResults: 0,
    query: '',
  }
}

export default configureStore({
  reducer: reduce,
  preloadedState: initialState(),
  middleware: [...getDefaultMiddleware()],
})
