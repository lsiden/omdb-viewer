import React from "react"
import PropTypes from "prop-types"

const CLOSE_ICON = "\u2715"

const closeButtonStyle = {
  margin: "8pt",
  fontSize: "20pt",
}

export const CloseButton = ({ onClick }) => (
  <button
    className="btn btn-link"
    style={closeButtonStyle}
    onClick={onClick}
    title="Close"
  >
    {CLOSE_ICON}
  </button>
)

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default CloseButton
