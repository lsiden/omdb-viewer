import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import FilmList from 'film-list'
import RoutedFilmDetail from 'film-detail'
import About from 'about'
import store from 'actions/store'

// FIXME - this may no longer be needed after Github enabled HTTPS to github pages
// See https://blog.github.com/2018-05-01-github-pages-custom-domains-https/

// See  https://itnext.io/so-you-want-to-host-your-single-age-react-app-on-github-pages-a826ab01e48
// for basename property.
const OmdbRouter = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
      <Route exact path="/" component={FilmList} />
      <Route path="/search/:query" component={FilmList} />
      <Route path="/film/:imdbID" component={RoutedFilmDetail} />
      <Route path="/about" component={About} />
    </div>
  </BrowserRouter>
)

export default () => (
  <Provider store={store}>
    <OmdbRouter />
  </Provider>
)
