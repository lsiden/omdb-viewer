import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import Actions from "actions/types"

const initialState = {
  view: Actions.VIEW_FILM_LIST,
}

export function reduce(state = initialState, action) {
  const { type, data } = action
  switch (type) {
    case Actions.VIEW_FILM_LIST:
    case Actions.VIEW_FILM_DETAIL:
    case Actions.UPDATE_FILMS:
    case Actions.UPDATE_FILM_DETAILS:
    case Actions.UPDATE_IS_FETCHING:
      return {
        ...state,
        ...data,
      }
    case Actions.APPEND_FILMS:
      return {
        ...state,
        ...data,
        films: [...state.films, ...data.films],
      }
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reduce, composeEnhancers(applyMiddleware(thunk)))

export default store
