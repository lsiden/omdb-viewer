import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setQuery } from 'store'
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

export class _QueryForm extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.onChange = this.onChange.bind(this)
    this.onCancel = this.onCancel.bind(this)

    // if (props.query) {
    //   props.dispatchSetQuery(props.query)
    // }
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

  onCancel() {
    this.replaceUriHistory()
    this.props.dispatchSetQuery('')
  }

  onChange(ev) {
    const { dispatchSetQuery } = this.props
    const query = ev.target.value
    this.replaceUriHistory(query)
    dispatchSetQuery(query)
  }

  replaceUriHistory(query = '') {
    const uri = query ? `/search/${query}` : '/'
    window.history.replaceState({}, '', uri)
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

_QueryForm.propTypes = {
  dispatchSetQuery: PropTypes.func.isRequired,
  query: PropTypes.string,
}
_QueryForm.defaultProps = {
  query: '',
}

export default connect(
  (state) => ({
    query: state.query || '',
  }),
  (dispatch) => ({
    dispatchSetQuery: (query='') => dispatch(setQuery(query)),
  }),
)(_QueryForm)
