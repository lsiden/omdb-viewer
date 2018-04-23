import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Provider } from "react-redux"

import FilmList from "film-list"
import FilmDetail from "film-detail"
import store from "actions/store"

export const omdbMain = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={FilmList} />
      <Route exact path="/film/:imdbID" component={FilmDetail} />
    </React.Fragment>
  </BrowserRouter>
)

const OmdbMain = () => (
  <Provider store={store}>
    <omdbMain />
  </Provider>
)

export default OmdbMain
