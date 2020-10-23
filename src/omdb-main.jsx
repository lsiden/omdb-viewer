import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Banner from 'components/banner'
import FilmList from 'features/film-list'
import FilmDetails from 'features/film-details'
import About from 'features/about'
import store from 'store'

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
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path="/" component={RoutedFilmList} />
        <Route path="/search/:query" component={RoutedFilmList} />
        <Route path="/film/:imdbID" component={RoutedFilmDetails} />
        <Route path="/about" component={About} />
      </Router>
    </Provider>
  </div>
)
