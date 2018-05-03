import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import cuid from "cuid"

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
    this.onInput = this.onInput.bind(this)
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
          onInput={this.onInput}
        />
      </form>
    )
  }

  onInput(ev) {
    this.setState({ query: ev.target.value })

    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.timeoutId = setTimeout(this.handleInputTimeout, QUERY_DELAY)
  }

  handleInputTimeout() {
    this.timeoutId = null
    this.props.dispatchQueryFetch(this.state.query)
  }
}

QueryForm.propTypes = {
  dispatchQueryFetch: PropTypes.func.isRequired,
}

export default connect(null, dispatch => ({
  dispatchQueryFetch: query => dispatch(queryFetch(query)),
}))(QueryForm)
