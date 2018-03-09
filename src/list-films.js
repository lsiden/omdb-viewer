import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Title from './title'

const style = {
	listStyleType: 'none'
}

const ListFilms = ({films=[]}) => <ul style={style}>{
	films.map(film => (<li key={film.imdbID}><Title film={film} /></li>))
}</ul>

ListFilms.propTypes = {
	films: PropTypes.arrayOf(PropTypes.object)
}

export default connect(
	state => ({
		films: state.films,
	})
)(ListFilms)
