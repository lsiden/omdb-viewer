import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { promiseQueryPageFetch } from 'store/async'
import NavButton from 'components/nav-button'
import { getFilms } from 'store'

const buttonStyle = {
  marginBottom: 20,
  fontSize: 20,
  color: 'darkgrey',
}

export const _MoreButton = ({ films, totalResults, dispatchPageFetch }) => (
  films.length < totalResults && (
    <NavButton
      onClick={dispatchPageFetch}
      style={buttonStyle}
      title="More"
    >
      More
    </NavButton>
  )
)

_MoreButton.propTypes = {
  dispatchPageFetch: PropTypes.func.isRequired,
}

_MoreButton.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalResults: PropTypes.number.isRequired,
}

export default connect(
  (state) => ({
    films: getFilms(state),
    totalResults: state.totalResults,
  }),
  (dispatch) => ({
    dispatchPageFetch: () => dispatch(promiseQueryPageFetch()),
  }),
)(_MoreButton)
