import React from 'react'
import ReactDOM from 'react-dom'

import App, { reduce } from 'App'
import { Actions, } from 'actions'

const films = require('./films.json').Search

test('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
})

test('Actions.OPEN_LIST', () => {
	const action = {type: Actions.OPEN_LIST, data: { films }}
	const newState = reduce({}, action)
	expect(newState.films).toBe(films)
	expect(newState.view).toBe(Actions.OPEN_LIST)
})

test('Actions.OPEN_LIST with empty data does not alter films', () => {
	const films = [
		'Rocky Horror Picture Show',
		'Halloween'
	]
	const state = { films }
	const action = {type: Actions.OPEN_LIST, data: {}}
	const newState = reduce(state, action)
	expect(newState.films).toBe(films)
	expect(newState.view).toBe(Actions.OPEN_LIST)
})

test('Actions.OPEN_DETAIL', () => {
	const action = {type: Actions.OPEN_DETAIL, data: {detail: films[0]}}
	const newState = reduce({}, action)
	expect(newState.detail.Title).toBeTruthy()
	expect(newState.view).toBe(Actions.OPEN_DETAIL)
})
