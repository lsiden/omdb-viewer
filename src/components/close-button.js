import React from "react"
import PropTypes from "prop-types"

import ButtonLink from "components/button-link"

const CLOSE_ICON = "\u2715"

const closeButtonStyle = {
  margin: "8pt",
  fontSize: "20pt",
}

export const CloseButton = ({ onClick }) => (
  <ButtonLink style={closeButtonStyle} onClick={onClick} title="Close">
    {CLOSE_ICON}
  </ButtonLink>
)

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CloseButton
