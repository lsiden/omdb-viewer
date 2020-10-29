import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import FilmList from 'features/film-list'
import FilmDetails from 'features/film-details'
import About from 'features/about'
import store from 'store'
import { setQuery } from 'store/async'
import { queryFromUriPath } from 'helpers'
import OmdbBanner from 'components/omdb-banner'
import QueryForm from 'components/query-form'

const RoutedFilmDetails = ({ match }) => (<FilmDetails imdbID={match.params.imdbID} />)
RoutedFilmDetails.propTypes = { match: PropTypes.object.isRequired }

const FilmListPage = () => (
  <div>
    <OmdbBanner />
    <QueryForm />
    <FilmList />
  </div>
)

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
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>
          <Route path="/search" component={FilmListPage} />
          <Route path="/film/:imdbID" component={RoutedFilmDetails} />
          <Route path="/about" component={About} />
        </Router>
      </Provider>
    </div>
  )
}
