import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { Provider } from "react-redux"

import FilmList from "film-list"
import FilmDetail from "film-detail"
import About from "about"
import store from "actions/store"

export const OmdbMainUnconnected = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={FilmList} />
      <Route exact path="/film/:imdbID" component={FilmDetail} />
      <Route exact path="/about" component={About} />
    </React.Fragment>
  </BrowserRouter>
)

const OmdbMain = () => (
  <Provider store={store}>
    <OmdbMainUnconnected />
  </Provider>
)

export default OmdbMain
