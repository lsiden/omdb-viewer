import React from 'react'
import ReactDOM from 'react-dom'

import App, { reduce } from 'App'
import { Actions, } from 'actions'

const films = require('./films.json').Search

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('reduces Actions.OPEN_LIST', () => {
	const action = {type: Actions.OPEN_LIST, data: { films }}
	const newState = reduce({}, action)
	expect(newState.films.length).toBeTruthy()
	expect(newState.view).toBe(Actions.OPEN_LIST)
})

it('reduces Actions.OPEN_DETAIL', () => {
	const action = {type: Actions.OPEN_DETAIL, data: {detail: films[0]}}
	const newState = reduce({}, action)
	expect(newState.detail.Title).toBeTruthy()
	expect(newState.view).toBe(Actions.OPEN_DETAIL)
})
