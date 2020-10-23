import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

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
// createStore()

const composeEnhancers = (
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
) || compose

export default createStore(reduce, composeEnhancers(applyMiddleware(thunk)))
