import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { pageFetch } from "actions/remote"

export const PureMoreButton = ({ dispatchPageFetch }) => (
  <button className="more-button" onClick={dispatchPageFetch}>
    More
  </button>
)

PureMoreButton.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  dispatchPageFetch: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isFetching: state.isFetching,
  }),
  dispatch => ({
    dispatchPageFetch: () => dispatch(pageFetch()),
  })
)(PureMoreButton)
