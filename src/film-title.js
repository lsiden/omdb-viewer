import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { viewFilmSummary } from "actions"
import { fetchFilmDetails } from "actions/remote"
import { TITLE_COLOR } from "constants"
import ButtonLink from "components/button-link"

const buttonStyle = {
  color: TITLE_COLOR,
}

export const FilmTitle = ({ filmSummary, dispatchViewDetail }) => (
  <div>
    <ButtonLink
      onClick={() => dispatchViewDetail(filmSummary)}
      style={buttonStyle}
      title="View film details"
    >
      {`${filmSummary.Title}, ${filmSummary.Year}`}
    </ButtonLink>
  </div>
)

FilmTitle.propTypes = {
  filmSummary: PropTypes.object.isRequired,
  dispatchViewDetail: PropTypes.func.isRequired,
}

export default connect(null, dispatch => ({
  dispatchViewDetail: filmSummary => {
    dispatch(viewFilmSummary(filmSummary))
    dispatch(fetchFilmDetails(filmSummary.imdbID))
  },
}))(FilmTitle)
