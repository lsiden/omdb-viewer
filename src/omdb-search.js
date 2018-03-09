// TODO rename to omdb-viewer

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Actions } from './actions'
import QueryForm from './query-form'
import FilmList from './film-list'
import FilmDetail from './film-detail'
import Show from './show'
import {OMD_URL} from './constants'

// import './omdb-search.css' // TODO replace with inline
const linkStyle = {
	color: 'white',
}
const headerStyle = {
	backgroundColor: '#222',
	/* height: 150px; */
	padding: '10px',
	color: 'white',
}
const titleStyle = {
	fontSize: '18pt',
	marginBottom: '18pt',
}

export const OmdbSearch = ({view}) => (
	<div className="App">
		<header style={headerStyle}>
			<h1 style={titleStyle}>
				<a href={OMD_URL} style={linkStyle}>Search Open Movie Database</a>
			</h1>
			<QueryForm />
		</header>
		<Show when={view === Actions.VIEW_LIST}>
			<FilmList />
		</Show>
		<Show when={view === Actions.VIEW_DETAIL}>
			<FilmDetail />
		</Show>
	</div>
)

OmdbSearch.propTypes = {
	view: PropTypes.string.isRequired,
}

export default connect(
	state => ({
		view: state.view
	})
)(OmdbSearch)
