import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import cuid from "cuid"

import { queryFetch } from "./actions"
import { QUERY_DELAY } from "./constants"
import SearchInput from "./components/search-input"

const formStyle = {
  minWidth: "320px",
  marginBottom: "8pt",
}

export class QueryForm extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { query: "" }
    this.onInput = this.onInput.bind(this)
    this.slug = cuid.slug()
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

  debounce(fn, delay) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null
      fn()
    }, delay)
  }

  onInput(ev) {
    const query = ev.target.value
    const fn = () => this.props.onChange(query)
    this.setState({ query })
    this.debounce(fn.bind(this), QUERY_DELAY)
  }
}

export default connect(null, dispatch => ({
  onChange: query => dispatch(queryFetch(query)),
}))(QueryForm)
