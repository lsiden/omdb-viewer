import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Title from './title'

const ulStyle = {
	listStyleType: 'none',
	lineHeight: 1.5,
}

const ListFilms = ({films}) => {
	const msgStyle = {
		fontSize: '14pt',
		color: '#3266ba',
		margin: '1em'
	}
	return films.length > 0
		? <ul style={ulStyle}>{
			films.map(film => (<li key={film.imdbID}><Title film={film} /></li>))
		}</ul>
		: <div style={msgStyle}>There are no films that match your query yet.</div>
}

ListFilms.propTypes = {
	films: PropTypes.arrayOf(PropTypes.object),
}
ListFilms.defaultProps = {
	films: [],
}

export default connect(
	state => ({
		films: state.films,
	})
)(ListFilms)
