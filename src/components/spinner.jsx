import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'respin'

export const _Spinner = ({ busy, style }) => (
  busy && <Spinner style={style} />
)

_Spinner.propTypes = {
  busy: PropTypes.bool.isRequired,
  style: PropTypes.object,
}

_Spinner.defaultProps = {
  style: {},
}

export default connect(
  (state) => ({
    busy: state.isFetching,
  })
)(_Spinner)
