import React from "react"
import PropTypes from "prop-types"

export const SEARCH_ICON = "\u26b2"

const wrapperStyle = {
  position: "relative",
  flex: "1 1",
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

const iconStyle = {
  position: "absolute",
  top: "3pt",
  left: "6pt",
  color: "#888",
  fontSize: "20pt",
  transform: "rotate(-45deg)",
}

export const SearchInput = props => {
  const { ...passProps } = props
  const style = { ...wrapperStyle }
  return (
    <div style={style}>
      <span
        style={iconStyle}
        charSet="utf-8"
        dangerouslySetInnerHTML={{ __html: SEARCH_ICON }}
      />
      <input type="search" style={inputStyle} {...passProps} />
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
  placeholder: "",
}

export default SearchInput
