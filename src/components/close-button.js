import React from "react"
import { Link } from "react-router-dom"

import ButtonLink from "components/button-link"

const CLOSE_ICON = "\u2715"

const closeButtonStyle = {
  margin: "8pt",
  fontSize: "20pt",
}

export const CloseButton = () => (
  <Link to="/">
    <ButtonLink style={closeButtonStyle} title="Close">
      {CLOSE_ICON}
    </ButtonLink>
  </Link>
)

export default CloseButton
