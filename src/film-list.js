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

const bottomStyle = {
  display: "flex",
  justifyContent: "space-between",
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
        <div style={bottomStyle}>
          <MoreButton />
          <a onClick={scrollToTop}>top</a>
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
