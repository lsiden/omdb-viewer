import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { viewFilmSummary, fetchFilmDetails } from './actions'

export const FilmTitle = ({filmSummary, dispatchViewDetail}) => (
	<li onClick={() => dispatchViewDetail(filmSummary)}>
		{`${filmSummary.Title}, ${filmSummary.Year}`}
	</li>
)

FilmTitle.propTypes = {
	filmSummary: PropTypes.object.isRequired,
	dispatchViewDetail: PropTypes.func.isRequired,
}

export default connect(
	null,
	(dispatch) => ({
		dispatchViewDetail: filmSummary => {
			dispatch(viewFilmSummary(filmSummary))
			dispatch(fetchFilmDetails(filmSummary.imdbID))
		}
	})
)(FilmTitle)
