import React from 'react'
import PropTypes from 'prop-types'

const ButtonLink = ({ style, onClick, children }) => (
  /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
  <button
    type="button"
    className="btn btn-link"
    style={style}
  >
    {children}
  </button>
)

ButtonLink.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
}

ButtonLink.defaultProps = {
  style: {},
}

export default ButtonLink
