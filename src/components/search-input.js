import React from "react"
import PropTypes from "prop-types"

import { SearchIcon, CancelIcon } from "components/icons"

const wrapperStyle = {
  position: "relative",
  flex: "1 1",
  maxWidth: 600,
  width: "100%",
  display: "flex",
}

const inputStyle = {
  height: "24pt",
  maxWidth: "640px",
  width: "100%",
  textIndent: "24pt",
  fontSize: "12pt",
  marginTop: "4pt",
  color: "black",
}

export const SearchInput = (props) => {
  const { onCancelClick, ...inputProps } = props
  return (
    <div style={wrapperStyle}>
      <SearchIcon />
      <input type="search" style={inputStyle} {...inputProps} />
      <CancelIcon onClick={onCancelClick} />
    </div>
  )
}

SearchInput.propTypes = {
  onCancelClick: PropTypes.func.isRequired,
}

SearchInput.defaultProps = {
  placeholder: "",
}

export default SearchInput
