import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import FilmTitle from "film-title"
import { TITLE_COLOR } from "./constants"
import MoreButton from "components/more-button"
import { scrollToTop, scrollToBottom } from "components/scroll"
import ButtonLink from "components/button-link"
import QueryForm from "query-form"
import { headerStyle, titleStyle } from "style"
import { BANNER_TITLE } from "./constants"
import { setQuery } from "actions"

const Banner = () => (
  <header style={headerStyle}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1 style={titleStyle}>{BANNER_TITLE}</h1>
      <a href="/about" style={{ color: "white" }}>
        about
      </a>
    </div>
    <QueryForm />
  </header>
)

const ulStyle = {
  listStyleType: "none",
  lineHeight: 1.5,
  marginTop: 20,
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

const renderFilmList = ({ films = [] }) => (
  <React.Fragment>
    <Banner />
    {films.length === 0 ? (
      <React.Fragment>
        <div style={msgStyle}>
          {"There are no films that match your query yet."}
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <ul style={ulStyle}>
          {films.map(filmSummary => (
            <FilmTitle key={filmSummary.imdbID} filmSummary={filmSummary} />
          ))}
        </ul>
        <div style={bottomRowStyle}>
          <MoreButton />
          <ButtonLink
            onClick={scrollToTop}
            style={topButtonStyle}
            title="Scroll to top of page"
          >
            top
          </ButtonLink>
        </div>
      </React.Fragment>
    )}
  </React.Fragment>
)

renderFilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
}

export class FilmList extends React.Component {
  componentDidUpdate() {
    scrollToBottom()
  }

  render() {
    return renderFilmList(this.props)
  }
}

const ConnectedFilmList = connect(state => ({
  films: state.films,
}))(FilmList)

const RoutedFilmList = ({ match, dispatchSetQuery }) => {
  const { query } = match.params
  dispatchSetQuery(query)
  return <ConnectedFilmList />
}

RoutedFilmList.propTypes = {
  match: PropTypes.object.isRequired,
  dispatchSetQuery: PropTypes.func.isRequired,
}

export default connect(null, dispatch => ({
  dispatchSetQuery: query => dispatch(setQuery(query)),
}))(RoutedFilmList)
