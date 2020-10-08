import React from 'react'
import PropTypes from 'prop-types'

const NavButton = ({ style, onClick, children }) => (
  /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
  <button
    type="button"
    onClick={onClick}
    className="btn btn-link"
    style={style}
  >
    {children}
  </button>
)

NavButton.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
}

NavButton.defaultProps = {
  style: {},
}

export default NavButton
