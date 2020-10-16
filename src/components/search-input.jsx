import React from 'react'
import PropTypes from 'prop-types'

import { SearchIcon, CancelIcon } from 'components/icons'

const wrapperStyle = {
  position: 'relative',
  width: '100%',
}

const inputStyle = {
  height: '24pt',
  textIndent: '24pt',
  fontSize: '12pt',
  color: 'black',
  width: '100%',
}

const SearchInput = ({ value, onCancelClick, onChange, placeholder }) => (
  <div style={wrapperStyle}>
    <SearchIcon />
    <input
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={inputStyle}
    />
    <CancelIcon onClick={onCancelClick} />
  </div>
)

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
}

SearchInput.defaultProps = {
  value: '',
  placeholder: '',
}

export default SearchInput
