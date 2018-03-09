import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import logo from './logo.svg'
import ListFilms from './list-films'
import { Actions } from './actions'

import './App.css'

// FIXME - for demo only
const films = require('./__tests__/films.json').Search

const initialState = { view: Actions.OPEN_DETAIL }

export function reduce(state=initialState, action) {
	const {type, data} = action
	switch(type) {
		case Actions.OPEN_LIST:
		case Actions.OPEN_DETAIL:
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

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<Provider store={store}>
					<ListFilms films={films} />
				</Provider>
			</div>
		)
	}
}

export default App
