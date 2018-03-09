import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FilmTitle from 'film-title'

const ulStyle = {
	listStyleType: 'none',
	lineHeight: 1.5,
}

export const FilmList = ({films}) => {
	const msgStyle = {
		fontSize: '14pt',
		color: '#3266ba',
		margin: '1em'
	}
	if (films.length > 0) {
		return (
			<ul style={ulStyle}>{
				films.map(filmSummary => (
					<FilmTitle
						key={filmSummary.imdbID}
						filmSummary={filmSummary}
					/>
				))
			}
			</ul>
		)
	} else {
		return <div style={msgStyle}>There are no films that match your query yet.</div>
	}
}

FilmList.propTypes = {
	films: PropTypes.arrayOf(PropTypes.object),
}
FilmList.defaultProps = {
	films: [],
}

export default connect(
	state => ({
		films: state.films,
	}),
)(FilmList)
