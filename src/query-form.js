import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

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
    const { query = "" } = props
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
      this.ref.querySelector("input").focus()
    }
  }

  componentDidCatch(err, errInfo) {
    console.error(err, errInfo)
  }

  render() {
    const { query } = this.state
    return (
      <form ref={(ref) => (this.ref = ref)} style={formStyle}>
        <label htmlFor={this.slug}>Search</label>
        <SearchInput
          placeholder="Title"
          value={query}
          onChange={this.handleInput}
          onCancelClick={this.handleCancel}
        />
      </form>
    )
  }

  replaceUriHistory(query = "") {
    const uri = query ? `/search/${query}` : "/"
    window.history.replaceState({}, "", uri)
  }

  handleCancel() {
    this.setState({ query: "" })
    this.replaceUriHistory()
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
      this.replaceUriHistory(query)
    } else {
      this.props.clearResults()
      this.replaceUriHistory()
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
  query: PropTypes.string,
}

export default connect(
  (state) => ({
    query: state.query || "",
  }),
  (dispatch) => ({
    dispatchQueryFetch: (query) => dispatch(queryFetch(query)),
    clearResults: () => dispatch(updateFilms()),
  })
)(QueryForm)
