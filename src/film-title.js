import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import { TITLE_COLOR } from "./constants"

const linkStyle = {
  color: TITLE_COLOR,
}

const FilmTitle = ({ filmSummary }) => (
  <div>
    <Link
      to={`/film/${filmSummary.imdbID}`}
      style={linkStyle}
      title="View film details"
    >
      {`${filmSummary.Title}, ${filmSummary.Year}`}
    </Link>
  </div>
)

FilmTitle.propTypes = {
  filmSummary: PropTypes.object.isRequired,
}
export default FilmTitle
