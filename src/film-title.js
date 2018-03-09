import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { viewDetail } from './actions'

export const FilmTitle = ({film, dispatchViewDetail}) => (
	<li onClick={() => dispatchViewDetail(film)}>{film.Title}</li>
)

FilmTitle.propTypes = {
	film: PropTypes.object.isRequired,
	dispatchViewDetail: PropTypes.func.isRequired,
}

export default connect(
	null,
	dispatch => ({
		disatchViewDetail: film => dispatch(viewDetail(film))
	})
)(FilmTitle)
