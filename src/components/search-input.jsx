import React from 'react'
import PropTypes from 'prop-types'

import { SearchIcon, CancelIcon } from 'components/icons'

const wrapperStyle = {
  position: 'relative',
  flex: '1 1',
  maxWidth: 600,
  width: '100%',
  display: 'flex',
}

const inputStyle = {
  height: '24pt',
  maxWidth: '640px',
  width: '100%',
  textIndent: '24pt',
  fontSize: '12pt',
  marginTop: '4pt',
  color: 'black',
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
