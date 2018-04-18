import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Spinner from "respin"

import { pageFetch } from "actions/remote"

const spinnerStyle = {
  marginLeft: 45,
}
export const PureMoreButton = ({ isFetching, dispatchPageFetch }) =>
  isFetching ? (
    <div style={spinnerStyle}>
      <Spinner />
    </div>
  ) : (
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
    isFetching: !!state.isFetching,
  }),
  dispatch => ({
    dispatchPageFetch: () => dispatch(pageFetch()),
  })
)(PureMoreButton)
