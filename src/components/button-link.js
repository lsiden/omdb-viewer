import React from "react"
import PropTypes from "prop-types"

const ButtonLink = (props) => <button className="btn btn-link" {...props} />

ButtonLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
}

export default ButtonLink
