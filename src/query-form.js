import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import cuid from "cuid"

import { updateFilms } from "actions"
import { queryFetch } from "actions/remote"
import { QUERY_DELAY } from "./constants"
import SearchInput from "components/search-input"

const formStyle = {
  minWidth: "320px",
  marginBottom: "8pt",
}

export class QueryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { query: "" }
    this.slug = cuid.slug()
    this.timeoutId = null
    this.handleInput = this.handleInput.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleInputTimeout = this.handleInputTimeout.bind(this)
  }

  componentDidMount() {
    if (this.ref) {
      this.ref.querySelector("input").focus()
    }
  }

  render() {
    const { query } = this.state
    return (
      <form ref={ref => (this.ref = ref)} style={formStyle}>
        <label htmlFor={this.slug}>Search</label>
        <SearchInput
          id={this.slug}
          type="search"
          placeholder="Title"
          value={query}
          onInput={this.handleInput}
          onCancelClick={this.handleCancel}
        />
      </form>
    )
  }

  handleCancel() {
    this.setState({ query: "" })
    this.props.clearResults()
  }

  handleInput(ev) {
    const query = ev.target.value
    this.setState({ query })

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    if (query) {
      this.timeoutId = setTimeout(this.handleInputTimeout, QUERY_DELAY)
    } else {
      this.props.clearResults()
    }
  }

  handleInputTimeout() {
    this.timeoutId = null
    this.props.dispatchQueryFetch(this.state.query)
  }
}

QueryForm.propTypes = {
  dispatchQueryFetch: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
}

export default connect(null, dispatch => ({
  dispatchQueryFetch: query => dispatch(queryFetch(query)),
  clearResults: () => dispatch(updateFilms()),
}))(QueryForm)
