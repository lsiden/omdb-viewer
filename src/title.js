import React from 'react'
import PropTypes from 'prop-types'

const Title = ({film}) => (
	<span className="title">{film.Title}</span>
)

Title.propTypes = {
	film: PropTypes.object.isRequired
}

export default Title
