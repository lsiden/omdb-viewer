import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import cuid from 'cuid'

import {queryFetch} from './actions'
import debugFactory from 'debug'
import {APP_NAME, QUERY_DELAY} from './constants'
import SearchInput from './search-input'

const debug = debugFactory(`${APP_NAME}:query-form:debug`)

const formStyle = {
	width: '70vw',
	minWidth: '320px',
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	justifyContent: 'flex-start',
	marginBottom: '8pt',
}

// TODO - Navigate back to list on new search
export class QueryForm extends React.Component {
	static propTypes = {
		onChange: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props)
		this.state = { query: '' }
		this.onInput = this.onInput.bind(this)
		this.slug = cuid.slug()
	}

	componentDidMount() {
		if (this.ref) {
			this.ref.querySelector('input').focus()
		}
	}

	render() {
		const {query} = this.state
		return (
			<form ref={ref => this.ref = ref} style={formStyle}>
				<label htmlFor={this.slug}>Search</label>&nbsp;
				<SearchInput
					id={this.slug}
					type='search'
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
		const fn = () => this.props.onChange(query)
		this.setState({ query })
		this.debounce(fn.bind(this), QUERY_DELAY)
	}
}

export default connect(
	null,
	dispatch => ({
		onChange: query => dispatch(queryFetch(query))
	})
)(QueryForm)
