import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import { setQuery, updateFilms } from 'actions'
import { promiseQueryResults } from 'actions/remote'
import SearchInput from 'components/search-input'
import { headerStyle } from 'style'

const formRowStyle = {
  display: 'flex',
}
const searchLabelStyle = {
  marginRight: '1em'
}
const searchInputStyle = {
  flex: '1 1'
}

class QueryForm extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.onChange = this.onChange.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  componentDidMount() {
    if (this.ref.current) {
      const searchInput = this.ref.current.querySelector('input[type=search]')

      if (searchInput) {
        searchInput.focus()
      }
    }
  }

  componentDidCatch(err, errInfo) {
    console.error(err, errInfo)
  }

  replaceUriHistory(query = '') {
    const uri = query ? `/search/${query}` : '/'
    window.history.replaceState({}, '', uri)
  }

  onCancel() {
    this.replaceUriHistory()
    this.props.clearResults()
  }

  onChange(ev) {
    const { clearResults, dispatchSetQuery } = this.props
    const query = ev.target.value
    this.replaceUriHistory(query)

    if (query) {
      dispatchSetQuery(query)
    } else {
      clearResults()
    }
  }

  render() {
    const { query } = this.props
    return (
      <form ref={this.ref} style={headerStyle}>
        <div style={formRowStyle}>
          <label htmlFor="query-form-search-input" style={searchLabelStyle}>Search</label>
          <SearchInput
            style={searchInputStyle}
            id="query-form-search-input"
            placeholder="Film Title ..."
            value={query}
            onChange={this.onChange}
            onCancelClick={this.onCancel}
          />
        </div>
      </form>
    )
  }
}

QueryForm.propTypes = {
  dispatchSetQuery: PropTypes.func.isRequired,
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
  (dispatch) => {
    const debouncedDispatchPromiseQueryResults = debounce(
      query => dispatch(promiseQueryResults(query)), 300)
    return ({
      dispatchSetQuery: (query) => {
        dispatch(setQuery(query))
        debouncedDispatchPromiseQueryResults(query)
      },
      clearResults: () => {
        dispatch(setQuery(''))
        dispatch(updateFilms())
      },
    })
  },
)(QueryForm)
