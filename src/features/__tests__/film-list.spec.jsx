import React from 'react'
import TestRenderer from 'react-test-renderer'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'

import { FilmList_ } from 'features/film-list'
import FilmTitle from 'components/film-title'
import store from 'actions/store'
import { updateFilms } from 'actions'

const films = require('./films.json').Search

it('renders list of titles', () => {
  const testInstance = TestRenderer.create(
    <Provider store={store}>
      <StaticRouter context={{}} >
        <FilmList_ query="a query" films={films} totalResults={films.length} />
      </StaticRouter>
    </Provider>
  )
  expect(testInstance.root.findAllByType(FilmTitle)).toHaveLength(films.length)
})
