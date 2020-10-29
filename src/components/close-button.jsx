import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const closeButtonStyle = {
  fontSize: 20,
}
const CLOSE_ICON = '\u2715'

const CloseButton = ({ next, buttonStyle }) => (
  <Link
    to={next}
    style={{ ...closeButtonStyle, ...buttonStyle }}
    title="Close"
  >
    {CLOSE_ICON}
  </Link>
)

CloseButton.propTypes = {
  next: PropTypes.string.isRequired,
  buttonStyle: PropTypes.object,
}

CloseButton.defaultProps = {
  buttonStyle: {},
}

export default CloseButton
