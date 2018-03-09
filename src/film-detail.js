import React from 'react'
import PropTypes from 'prop-types'

export const FilmDetail = ({film}) => {
	const {
		Title: title,
		Year: year,
		Poster: posterUrl,
	} = film
	return <div>
		<h1>`${title} - ${year}`</h1>
		<img src={posterUrl} />
	</div>
}

FilmDetail.propTypes = {
	film: PropTypes.object.isRequired
}

export default FilmDetail
