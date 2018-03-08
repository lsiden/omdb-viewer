import React from 'react'
import PropTypes from 'prop-types'

function Title({film}) {
	return "A title"
}

Title.propTypes = {
	film: PropTypes.object.isRequired
}

const ListFilms = ({films=[]}) => <ul>{
	films.map(film => (<li key={film.imdbID}><Title film={film} /></li>))
}</ul>

ListFilms.propTypes = {
	films: PropTypes.arrayOf(PropTypes.object)
}

export default ListFilms
