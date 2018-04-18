import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { viewFilmSummary, fetchFilmDetails } from "actions"
import { ButtonLink } from "components/button-link"
import { TITLE_COLOR } from "constants"

const buttonStyle = {
  color: TITLE_COLOR,
}

export const FilmTitle = ({ filmSummary, dispatchViewDetail }) => (
  <div>
    <ButtonLink
      onClick={() => dispatchViewDetail(filmSummary)}
      addStyle={buttonStyle}
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
