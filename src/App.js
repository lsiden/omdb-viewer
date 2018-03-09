import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import FilmIndex from './film-index'
import { Actions } from './actions'

const initialState = { view: Actions.VIEW_DETAIL }

export function reduce(state=initialState, action) {
	const {type, data} = action
	switch(type) {
	case Actions.VIEW_LIST:
	case Actions.VIEW_DETAIL:
	case Actions.UPDATE_LIST:
		return {
			...state,
			...data,
			view: type
		}
	default:
		return state
	}
}

const store = createStore(reduce, applyMiddleware(thunk))

const App = () => (
	<Provider store={store}>
		<FilmIndex />
	</Provider>
)

export default App
