import React from 'react'
import PropTypes from 'prop-types'

const SEARCH_ICON = '\u26b2'
const CANCEL_ICON = '\u274c'
const ICON_COLOR = '#888'

const searchIconStyle = {
  position: 'absolute',
  top: '3pt',
  left: '6pt',
  color: ICON_COLOR,
  fontSize: '20pt',
  transform: 'rotate(-45deg)',
}

export const SearchIcon = () => (
  <span
    style={searchIconStyle}
    charSet="utf-8"
    dangerouslySetInnerHTML={{ __html: SEARCH_ICON }} /* eslint-disable-line react/no-danger */
  />
)

const cancelIconStyle = {
  position: 'absolute',
  top: 5,
  right: 5,
  fontSize: '18pt',
  color: ICON_COLOR,
}

export const CancelIcon = ({ onClick }) => (
  <span /* eslint-disable-line jsx-a11y/control-has-associated-label */
    role="button"
    tabIndex={0}
    title="Cancel"
    className="hover-pointer"
    style={cancelIconStyle}
    charSet="utf-8"
    dangerouslySetInnerHTML={{ __html: CANCEL_ICON }} /* eslint-disable-line react/no-danger */
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
