import React from 'react'
import PropTypes from 'prop-types'

export const SEARCH_ICON = '\u26b2'

const wrapperStyle = {
	position: 'relative',
	display: 'flex',
	width: '85%',
}

const inputStyle = {
	height: '32px',
	textIndent: '24pt',
	fontSize: '12pt',
	flex: '1 1 85%',
}

const iconStyle = {
	position: 'absolute',
	top: '1pt',
	left: '6pt',
	color: '#888',
	fontSize: '20pt',
	transform: 'rotate(-45deg)',
}

export const SearchInput = (props) => {
	return (
		<div style={wrapperStyle}>
			<span
				style={iconStyle}
				charSet="utf-8"
				dangerouslySetInnerHTML={{__html: SEARCH_ICON}}
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
