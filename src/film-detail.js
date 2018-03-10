import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { viewList } from './actions'
import { ESC_KEY } from './constants'

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

export class FilmDetail extends React.Component {
	constructor(props) {
		super(props)
		this.keyDownListener = this.keyDownListener.bind(this)
	}

	keyDownListener(ev) {
		if (ev.keyCode === ESC_KEY) {
			this.props.dispatchViewList()
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.keyDownListener)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.keyDownListener)
	}

	render() {
		const {
			filmSummary,
			filmDetails,
			dispatchViewList
		} = this.props
		const imdbUrl = `https://www.imdb.com/title/${filmDetails.imdbID}`
		return (
			<div style={wrapperStyle}>
				<a name="top" />
				<div style={headerStyle}>
					<h1 style={titleStyle}>{filmSummary.Title}</h1>
					<a
						href='#'
						onClick={() => dispatchViewList()}
						id="close-button"
						title="Close"
						style={closeButtonStyle}
					>{'Close'}</a>
				</div>
				<img src={filmSummary.Poster} />
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
					{
						filmDetails.Website && (
							<li><a href={filmDetails.Website}>Official website</a></li>
						)
					}
					<li><a href={imdbUrl}>{'IMDB page'}</a></li>
				</ul>
				<br />
				<a href="#top">Top</a>
			</div>
		)
	}
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
