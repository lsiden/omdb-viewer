import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Spinner from "respin"

import { pageFetch } from "actions/remote"

const spinnerStyle = {
  marginLeft: 45,
  marginBottom: 20,
}

const buttonStyle = {
  marginBottom: 20,
  fontSize: 20,
  color: "darkgrey",
}

export const PureMoreButton = ({ isFetching, dispatchPageFetch }) =>
  isFetching ? (
    <div style={spinnerStyle}>
      <Spinner />
    </div>
  ) : (
    <button
      className="btn btn-link"
      onClick={dispatchPageFetch}
      style={buttonStyle}
      title="More"
    >
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
