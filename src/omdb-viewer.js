import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Actions from "./action-types"
import QueryForm from "./query-form"
import FilmList from "./film-list"
import FilmDetail from "./film-detail"
import Show from "components/show"
import { OMDB_URL } from "./constants"

const linkStyle = {
  color: "white",
  fontSize: "small",
}
const headerStyle = {
  background: "linear-gradient(to right, #000040, #3b00ff)",
  padding: "10px",
  color: "white",
}
const titleStyle = {
  fontSize: "18pt",
  marginBottom: "18pt",
}

// TODO use as component
const renderBanner = () => (
  <header style={headerStyle}>
    <h1 style={titleStyle}>
      {"Search Open Movie Database"}&nbsp;
      <a href={OMDB_URL} style={linkStyle}>
        (OMDB)
      </a>
    </h1>
    <QueryForm />
  </header>
)

// TODO build custom routing component
export const OmdbSearch = ({ view }) => (
  <div className="App">
    {renderBanner()}
    <Show when={view === Actions.VIEW_FILM_LIST}>
      <FilmList />
    </Show>
    <Show when={view === Actions.VIEW_FILM_DETAIL}>
      <FilmDetail />
    </Show>
  </div>
)

OmdbSearch.propTypes = {
  view: PropTypes.string.isRequired,
}

export default connect(state => ({
  view: state.view,
}))(OmdbSearch)
