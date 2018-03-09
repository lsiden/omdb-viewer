import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const titleStyle = {
	marginBottom: '5pt',
}
const detailsStyle = {
	fontSize: '14pt',
	color: '#888',
}

const googleSearch = (query) => `https://www.google.com/search?q=${query}`

export const FilmDetail = ({filmSummary, filmDetails}) => {
	return <div>
		<h1 style={titleStyle}>
			<a href={filmDetails.Website || googleSearch(filmSummary.Title)}>{filmSummary.Title}</a>
		</h1>
		<ul style={detailsStyle}>
			<li>{filmSummary.Year}</li>
			<li>Directed by {filmDetails.Director}</li>
			<li>Written by {filmDetails.Writer}</li>
			<li>Cast: {filmDetails.Actors}</li>
			<li>Language: {filmDetails.Language}</li>
			{
				filmDetails.Awards && <li>Awards: {filmDetails.Awards}</li>
			}
			<li>IMDB Rating: {filmDetails.imdbRating}/10</li>
			<li>Box Office: {filmDetails.BoxOffice}</li>
		</ul>
		<img src={filmSummary.Poster} />
	</div>
}

FilmDetail.propTypes = {
	filmSummary: PropTypes.object.isRequired,
	filmDetails: PropTypes.object,
}

FilmDetail.defaultProps = {
	filmDetails: {},
}

export default connect(
	state => ({
		filmSummary: state.filmSummary,
		filmDetails: state.filmDetails,
	})
)(FilmDetail)
