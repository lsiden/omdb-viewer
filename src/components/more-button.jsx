import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { promiseQueryPageFetch } from 'actions/remote'
import NavButton from 'components/nav-button'

const buttonStyle = {
  marginBottom: 20,
  fontSize: 20,
  color: 'darkgrey',
}

export const _MoreButton = ({ dispatchPageFetch }) => (
  <NavButton onClick={dispatchPageFetch} style={buttonStyle} title="More">
    More
  </NavButton>
)

_MoreButton.propTypes = {
  dispatchPageFetch: PropTypes.func.isRequired,
}

export default connect(
  () => ({}),
  (dispatch) => ({
    dispatchPageFetch: () => dispatch(promiseQueryPageFetch()),
  }),
)(_MoreButton)
