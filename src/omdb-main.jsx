import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Banner from 'components/banner'
import FilmList from 'features/film-list'
import FilmDetails from 'features/film-details'
import About from 'features/about'
import store from 'actions/store'

// FIXME - this may no longer be needed after Github enabled HTTPS to github pages
// See https://blog.github.com/2018-05-01-github-pages-custom-domains-https/

const RoutedFilmDetails = ({ match }) => (<FilmDetails imdbID={match.params.imdbID} />)
const RoutedFilmList = ({ match }) => (<FilmList query={match.params.query} />)
RoutedFilmDetails.propTypes = { match: PropTypes.object.isRequired }
RoutedFilmList.propTypes = { match: PropTypes.object.isRequired }

// See  https://itnext.io/so-you-want-to-host-your-single-age-react-app-on-github-pages-a826ab01e48
// for basename property.
export default () => (
  <div>
    <Banner />
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <Route exact path="/" component={RoutedFilmList} />
          <Route path="/search/:query" component={RoutedFilmList} />
          <Route path="/film/:imdbID" component={RoutedFilmDetails} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    </Provider>
  </div>
)
