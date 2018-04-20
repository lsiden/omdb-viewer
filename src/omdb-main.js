import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Actions from "actions/types"
import FilmList from "film-list"
import FilmDetail from "film-detail"
import Show from "components/show"
import Banner from "components/banner"

// TODO build custom routing component
export const OmdbMain = ({ view }) => (
  <div className="App">
    <Banner />
    <Show when={view === Actions.VIEW_FILM_LIST}>
      <FilmList />
    </Show>
    <Show when={view === Actions.VIEW_FILM_DETAIL}>
      <FilmDetail />
    </Show>
  </div>
)

OmdbMain.propTypes = {
  view: PropTypes.string.isRequired,
}

export default connect(state => ({
  view: state.view,
}))(OmdbMain)
