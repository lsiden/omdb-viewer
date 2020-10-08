import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { updateFilms } from 'actions'
import { queryFetch } from 'actions/remote'
import SearchInput from 'components/search-input'
import { QUERY_DELAY } from './constants'

const formStyle = {
  minWidth: '320px',
  marginBottom: '8pt',
}

class QueryForm extends React.Component {
  constructor(props) {
    super(props)
    const { query = '' } = props
    this.state = { query }
    this.timeoutId = null
    this.handleInput = this.handleInput.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleInputTimeout = this.handleInputTimeout.bind(this)
  }

  componentDidMount() {
    const { query, dispatchQueryFetch } = this.props

    if (query) {
      dispatchQueryFetch(query)
    }

    if (this.ref) {
      this.ref.querySelector('input').focus()
    }
  }

  componentDidCatch(err, errInfo) {
    console.error(err, errInfo)
  }

  /* eslint-disable-next-line class-methods-use-this */
  replaceUriHistory(query = '') {
    const uri = query ? `/search/${query}` : '/'
    window.history.replaceState({}, '', uri)
  }

  handleCancel() {
    const { clearResults } = this.props
    this.setState({ query: '' })
    this.replaceUriHistory()
    clearResults()
  }

  handleInput(ev) {
    const { clearResults } = this.props
    const query = ev.target.value
    this.setState({ query })

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    if (query) {
      this.timeoutId = setTimeout(this.handleInputTimeout, QUERY_DELAY)
      this.replaceUriHistory(query)
    } else {
      clearResults()
      this.replaceUriHistory()
    }
  }

  handleInputTimeout() {
    const { dispatchQueryFetch } = this.props
    const { query } = this.state
    this.timeoutId = null
    dispatchQueryFetch(query)
  }

  render() {
    const { query } = this.state
    return (
      <form ref={(ref) => { this.ref = ref }} style={formStyle}>
        <label>
          Search
          <SearchInput
            placeholder="Title"
            value={query}
            onChange={this.handleInput}
            onCancelClick={this.handleCancel}
          />
        </label>
      </form>
    )
  }
}

QueryForm.propTypes = {
  dispatchQueryFetch: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  query: PropTypes.string,
}
QueryForm.defaultProps = {
  query: '',
}

export default connect(
  (state) => ({
    query: state.query || '',
  }),
  (dispatch) => ({
    dispatchQueryFetch: (query) => dispatch(queryFetch(query)),
    clearResults: () => dispatch(updateFilms()),
  }),
)(QueryForm)
