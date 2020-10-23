import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import NavButton from 'components/nav-button'

const closeButtonStyle = {
  fontSize: 20,
}
const CLOSE_ICON = '\u2715'

const CloseButton = ({ buttonStyle }) => {
  const hist = useHistory()
  return (
    <NavButton
      onClick={hist.goBack}
      style={{ ...closeButtonStyle, ...buttonStyle }}
      title="Close"
    >
      {CLOSE_ICON}
    </NavButton>
  )
}

CloseButton.propTypes = {
  buttonStyle: PropTypes.object,
}

CloseButton.defaultProps = {
  buttonStyle: {},
}

export default CloseButton
