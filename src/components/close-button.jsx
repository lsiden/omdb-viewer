import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ButtonLink from 'components/button-link'

const CLOSE_ICON = '\u2715'

const closeButtonStyle = {
  margin: 20,
  fontSize: 20,
}

const CloseButton = ({ buttonStyle, onClick }) => {
  const style = {
    ...closeButtonStyle,
    ...buttonStyle,
  }
  return (
    <Link to="/">
      <ButtonLink onClick={onClick} style={style} title="Close">
        {CLOSE_ICON}
      </ButtonLink>
    </Link>
  )
}
CloseButton.propTypes = {
  buttonStyle: PropTypes.object,
}
CloseButton.defaultProps = {
  buttonStyle: {},
}

export default CloseButton
