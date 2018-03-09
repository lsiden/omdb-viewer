import React from 'react'
import PropTypes from 'prop-types'

const wrapperStyle = {
	position: 'relative',
	display: 'flex',
	width: '85%',
}

const inputStyle = {
	height: '32px',
	textIndent: '20px',
	fontSize: '12pt',
	flex: '1 1 85%',
}

const iconStyle = {
	position: 'absolute',
	top: '4pt',
	left: '8px',
	color: '#555',
	transform: 'rotate(-45deg)',
}

export const SearchInput = (props) => {
	const magnifier = '\u26b2'
	return (
		<div style={wrapperStyle}>
			<span
				style={iconStyle}
				charSet="utf-8"
				dangerouslySetInnerHTML={{__html: magnifier}}
			/>
			<input type="search" style={inputStyle} {...props} />
		</div>
	)
}

SearchInput.propTypes = {
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	onInput: PropTypes.func.isRequired,
}

SearchInput.defaultProps = {
	placeholder: '',
}

export default SearchInput
