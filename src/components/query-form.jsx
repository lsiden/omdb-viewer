import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setQuery, updateFilms } from 'actions'
import { queryFetch } from 'actions/remote'
import SearchInput from 'components/search-input'

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
    this.handleInput = this.handleInput.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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

  handleCancel() {
    this.replaceUriHistory()
    this.props.clearResults()
  }

  handleInput(ev) {
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
      <form ref={this.ref}>
        <div style={formRowStyle}>
          <label htmlFor="query-form-search-input" style={searchLabelStyle}>Search</label>
          <SearchInput
            style={searchInputStyle}
            id="query-form-search-input"
            placeholder="Film Title ..."
            value={query}
            onChange={this.handleInput}
            onCancelClick={this.handleCancel}
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
  (dispatch) => ({
    dispatchSetQuery: (query) => {
      dispatch(setQuery(query))
      dispatch(queryFetch(query))
    },
    clearResults: () => dispatch(updateFilms()),
  }),
)(QueryForm)
