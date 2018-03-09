import React from 'react'
import PropTypes from 'prop-types'


export class QueryForm extends React.Component {
	static propTypes = {
		query: PropTypes.string,
		onChange: PropTypes.func.isRequired,
	};

	static defaultProps = {
		query: '',
	};

	constructor(props) {
		super(props)
		const { query } = props
		this.state = { query }
	}

	render() {
		const {query, onChange} = this.props
		return <form>
			<label>Search for Title</label>
			<input
				type='text'
				value={query}
				onChange={ev => onChange(ev.target.value)}
			/>
		</form>
	}
}
export default QueryForm
