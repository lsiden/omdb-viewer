import React from 'react'
import PropTypes from 'prop-types'

import { ESC_KEY } from 'omdb_constants'

const SEARCH_ICON = '\u26b2'
const CANCEL_ICON = '\u274c'
const ICON_COLOR = '#888'

const searchIconStyle = {
  position: 'absolute',
  top: '-4pt',
  left: '6pt',
  color: ICON_COLOR,
  fontSize: '20pt',
  transform: 'rotate(-45deg)',
}

export const SearchIcon = () => (
  <span
    style={searchIconStyle}
    charSet="utf-8"
    dangerouslySetInnerHTML={{ __html: SEARCH_ICON }}
  />
)

const cancelIconStyle = {
  position: 'absolute',
  top: 6,
  right: 6,
  fontSize: '8pt',
  color: ICON_COLOR,
}

export const CancelIcon = ({ onClick }) => {
  const onKeyPress = (ev) => {
    if (ev.keyCode === ESC_KEY) {
      onClick()
    }
  }
  return (<span
    role="button"
    tabIndex={0}
    aria-label="Cancel"
    className="hover-pointer"
    style={cancelIconStyle}
    charSet="utf-8"
    dangerouslySetInnerHTML={{ __html: CANCEL_ICON }}
    onClick={onClick}
    onKeyPress={onKeyPress}
  />)
}

CancelIcon.propTypes = {
  onClick: PropTypes.func,
}

CancelIcon.defaultProps = {
  onClick: () => {},
}
