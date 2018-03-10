import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { viewList } from './actions'

const wrapperStyle = {
	marginLeft: '10pt',
}
const headerStyle = {
	display: 'flex',
	justifyContent: 'space-between',
}
const titleStyle = {
	marginBottom: '5pt',
}
const detailsStyle = {
	fontSize: '14pt',
	color: '#888',
}
const closeButtonStyle = {
	margin: '1em',
}

const googleSearch = (query) => `https://www.google.com/search?q=${query}`

// TODO - Navigate back to list
export const FilmDetail = ({filmSummary, filmDetails, dispatchViewList}) => {
	return <div style={wrapperStyle}>
		<a name="top" />
		<div style={headerStyle}>
			<h1 style={titleStyle}>
				<a href={filmDetails.Website || googleSearch(filmSummary.Title)}>{filmSummary.Title}</a>
			</h1>
			<a
				href='#'
				onClick={() => dispatchViewList()}
				id="close-button"
				title="Close"
				style={closeButtonStyle}
			>
				Close
			</a>
		</div>
		<ul style={detailsStyle}>
			<li>{filmSummary.Year}</li>
			<li>Directed by {filmDetails.Director}</li>
			<li>Written by {filmDetails.Writer}</li>
			<li>Cast: {filmDetails.Actors}</li>
			<li>Language: {filmDetails.Language}</li>
			{
				filmDetails.Awards && <li>Awards: {filmDetails.Awards}</li>
			}
			<li>Run Time: {filmDetails.Runtime}</li>
			<li>IMDB Rating: {filmDetails.imdbRating}/10</li>
			<li>Box Office: {filmDetails.BoxOffice}</li>
		</ul>
		<img src={filmSummary.Poster} />
		<br />
		<a href="#top">Top</a>
	</div>
}

FilmDetail.propTypes = {
	filmSummary: PropTypes.object.isRequired,
	filmDetails: PropTypes.object,
	dispatchViewList: PropTypes.func.isRequired,
}

FilmDetail.defaultProps = {
	filmDetails: {},
}

export default connect(
	state => ({
		filmSummary: state.filmSummary,
		filmDetails: state.filmDetails,
	}),
	dispatch => ({
		dispatchViewList: () => dispatch(viewList())
	})
)(FilmDetail)
