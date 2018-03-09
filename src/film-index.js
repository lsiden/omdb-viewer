import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ListFilms from './list-films'
import { Actions } from './actions'
import Show from './show'

import logo from './logo.svg'
import './film-index.css'

// FIXME - for demo only
const films = require('./__tests__/films.json').Search

export const FilmIndex = ({view}) => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to React</h1>
		</header>
		<Show when={view === Actions.VIEW_LIST}>
			<ListFilms films={films} />
		</Show>
	</div>
)

FilmIndex.propTypes = {
	view: PropTypes.string.isRequired,
}

export default connect(
	state => ({
		view: state.view
	})
)(FilmIndex)
