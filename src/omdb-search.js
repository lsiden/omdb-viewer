import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Actions } from './actions'
import QueryForm from './query-form'
import FilmList from './film-list'
import FilmDetail from './film-detail'
import Show from './show'
import {OMD_URL} from './constants'

// TODO provide routing to enable bookmarking results and details
const linkStyle = {
	color: 'white',
	fontSize: 'small',
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
const renderBanner = () => (
	<header style={headerStyle}>
		<h1 style={titleStyle}>
			{'Search Open Movie Database'}&nbsp;
			<a href={OMD_URL} style={linkStyle}>(OMDB)</a>
		</h1>
		<QueryForm />
	</header>
)

export const OmdbSearch = ({view}) => (
	<div className="App">
		{renderBanner()}
		<Show when={view === Actions.VIEW_FILM_LIST}>
			<FilmList />
		</Show>
		<Show when={view === Actions.VIEW_FILM_DETAIL}>
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
