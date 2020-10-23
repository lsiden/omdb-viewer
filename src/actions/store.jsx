import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import Actions from 'actions/types'
import { reduceNewFilms, reduceMoreFilms } from 'actions/films'

const initialState = {
  isFetching: false,
  films: [],
  totalResults: 0,
  query: '',
}

export function reduce(state = initialState, action) {
  const { type, data } = action
  switch (type) {
    case Actions.UPDATE_FILM_DETAILS:
    case Actions.UPDATE_IS_FETCHING:
    case Actions.SET_QUERY:
      return {
        ...state,
        ...data,
      }
    case Actions.UPDATE_FILMS:
      return reduceNewFilms(state, data)
    case Actions.APPEND_FILMS:
      return reduceMoreFilms(state, data)
    default:
      return state
  }
}

const composeEnhancers = (
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
) || compose
const store = createStore(reduce, composeEnhancers(applyMiddleware(thunk)))

export default store
