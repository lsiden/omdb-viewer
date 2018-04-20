import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import FilmList from "film-list"
import FilmDetail from "film-detail"

const OmdbMain = () => (
  <div className="App">
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={FilmList} />
        <Route exact path="/film/:imdbID" component={FilmDetail} />
      </React.Fragment>
    </BrowserRouter>
  </div>
)

export default OmdbMain
