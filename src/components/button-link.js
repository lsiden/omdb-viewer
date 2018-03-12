// Renders a button that appears as a link and is tabbable.

import React from 'react'
import PropTypes from 'prop-types'

const buttonStyle = {
  background: 'none',
  border: 'none',
  padding: '0!important',
  cursor: 'pointer',
  fontSize: '12pt',
}

export const ButtonLink = ({
  children,
  onClick,
  addStyle,
  ...passProps
}) => {
  const mergedStyle = { ...buttonStyle, ...addStyle }
  return (
    <button onClick={onClick} {...passProps} style={mergedStyle}>
      {children}
    </button>
  )
}

ButtonLink.propTypes = {
  onClick: PropTypes.func.isRequired,
  addStyle: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]).isRequired
}

ButtonLink.defaultProps = {
  addStyle: {}
}

export default ButtonLink
