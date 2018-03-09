// TODO rename to omdb-viewer

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Actions } from './actions'
import Show from './show'
import QueryForm from './query-form'
import ListFilms from './list-films'
import {OMD_URL} from './constants'

import './film-index.css' // TODO replace with inline
const linkStyle = {
	color: 'white',
}

export const FilmIndex = ({view}) => (
	<div className="App">
		<header className="App-header">
			<h1 className="App-title">
				<a href={OMD_URL} style={linkStyle}>Search Open Movie Database</a>
			</h1>
			<QueryForm />
		</header>
		<Show when={view === Actions.VIEW_LIST}>
			<ListFilms />
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
