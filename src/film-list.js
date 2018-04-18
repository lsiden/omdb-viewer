import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import FilmTitle from "film-title"
import { TITLE_COLOR } from "constants"
import MoreButton from "components/more-button"
import { scrollToTop, scrollToBottom } from "components/scroll"

const ulStyle = {
  listStyleType: "none",
  lineHeight: 1.5,
}
const msgStyle = {
  fontSize: "14pt",
  color: TITLE_COLOR,
  margin: "1em",
}

const bottomRowStyle = {
  marginLeft: 40,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "baseline",
}

const topButtonStyle = {
  marginLeft: 40,
  fontSize: 16,
  color: "darkgrey",
}

const renderFilmList = ({ films }) => {
  if (films.length > 0) {
    return (
      <React.Fragment>
        <ul style={ulStyle}>
          {films.map(filmSummary => (
            <FilmTitle key={filmSummary.imdbID} filmSummary={filmSummary} />
          ))}
        </ul>
        <div style={bottomRowStyle}>
          <MoreButton />
          <button
            className="btn btn-link"
            onClick={scrollToTop}
            style={topButtonStyle}
            title="Scroll to top of page"
          >
            top
          </button>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <div style={msgStyle}>
        {"There are no films that match your query yet."}
      </div>
    )
  }
}

export class FilmList extends React.Component {
  componentDidUpdate() {
    scrollToBottom()
  }

  render() {
    return renderFilmList(this.props)
  }
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
}
FilmList.defaultProps = {
  films: [],
}

export default connect(state => ({
  films: state.films,
}))(FilmList)
