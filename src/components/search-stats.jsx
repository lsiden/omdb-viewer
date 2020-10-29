import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getFilms } from 'store'

export const _SearchStats = ({ numFetched, numFound, style }) => (
  <div style={style}>
    Fetched {numFetched} of {numFound}
  </div>
)

_SearchStats.propTypes = {
  numFetched: PropTypes.number.isRequired,
  numFound: PropTypes.number.isRequired,
  style: PropTypes.object,
}

_SearchStats.defaultProps = {
  style: {},
}

export default connect(
  (state, ownProps) => ({
    numFetched: getFilms(state).length,
    numFound: state.totalResults || 0,
    style: ownProps.style,
  })
)(_SearchStats)
