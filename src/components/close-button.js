import React from 'react'
import PropTypes from 'prop-types'

import ButtonLink from './button-link'

const CLOSE_ICON = '\u2715'

const closeButtonStyle = {
  margin: '8pt',
  fontSize: '20pt',
  // border: 'solid'
}

export const CloseButton = ({onClick}) => (
  <ButtonLink
    onClick={onClick}
    id="close-button"
    title="Close"
    addStyle={closeButtonStyle}
  >{CLOSE_ICON}</ButtonLink>
)

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CloseButton
