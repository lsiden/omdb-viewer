import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import FilmList from 'features/film-list'
import FilmDetails from 'features/film-details'
import About from 'features/about'
import store, { setQuery } from 'store'
import { queryFromUriPath } from 'helpers'

const RoutedFilmDetails = ({ match }) => (<FilmDetails imdbID={match.params.imdbID} />)
const RoutedFilmList = ({ match }) => (<FilmList query={match.params.query} />)
RoutedFilmDetails.propTypes = { match: PropTypes.object.isRequired }
RoutedFilmList.propTypes = { match: PropTypes.object.isRequired }

// if (state.query && (!state.films || state.films.length === 0)) {
//   store.dispatch()
// }

// See  https://itnext.io/so-you-want-to-host-your-single-age-react-app-on-github-pages-a826ab01e48
// for basename property.
export default () => {
  const query = queryFromUriPath(window.location.pathname)

  if (query) {
    store.dispatch(setQuery(query))
  }
  return (
    <div>
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
}