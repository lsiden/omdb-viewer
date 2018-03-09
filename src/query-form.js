import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {queryFetch} from './actions'
import debugFactory from 'debug'
import {APP_NAME, QUERY_DELAY} from './constants'

const debug = debugFactory(`${APP_NAME}:query-form:debug`)

export class QueryForm extends React.Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props)
		this.state = { query: '' }
		this.onInput = this.onInput.bind(this)
	}

	render() {
		const {query} = this.state
		return (
			<form ref={ref => this.ref = ref}>
				<label>Search</label>&nbsp;
				<input
					type='text'
					placeholder=' title'
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
		debug('onInput(): query', query)
		this.setState({ query })
		const fn = () => this.props.onChange(query)
		this.debounce(fn.bind(this), QUERY_DELAY)
	}
}

export default connect(
	null,
	dispatch => ({
		onChange: query => dispatch(queryFetch(query))
	})
)(QueryForm)
