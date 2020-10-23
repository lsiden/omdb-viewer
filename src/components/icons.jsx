import React from 'react'
import PropTypes from 'prop-types'

const SEARCH_ICON = '\u26b2'
const CANCEL_ICON = '\u2a09'
const ICON_COLOR = '#888'

const searchIconStyle = {
  position: 'absolute',
  top: '-4pt',
  left: '6pt',
  color: ICON_COLOR,
  fontSize: '20pt',
  transform: 'rotate(-45deg)',
}

const cancelIconStyle = {
  position: 'absolute',
  bottom: 4,
  right: 8,
  color: ICON_COLOR,
}

export const SearchIcon = () => (
  <span
    style={searchIconStyle}
    charSet="utf-8"
    dangerouslySetInnerHTML={{ __html: SEARCH_ICON }}
  />
)

export const CancelIcon = ({ onClick }) => (
  <span
    role="button"
    tabIndex={0}
    aria-label="Cancel"
    className="hover-pointer"
    style={cancelIconStyle}
    charSet="utf-8"
    dangerouslySetInnerHTML={{ __html: CANCEL_ICON }}
    onClick={onClick}
    onKeyPress={onClick}
  />
)

CancelIcon.propTypes = {
  onClick: PropTypes.func,
}

CancelIcon.defaultProps = {
  onClick: () => {},
}
