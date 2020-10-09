import React from 'react'
import TestRenderer from 'react-test-renderer'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'

import FilmList from 'features/film-list'
import FilmTitle from 'components/film-title'
import store from 'actions/store'
import { updateFilms } from 'actions'

const defaultProps = {
  match: {
    params: {
      query: '',
    },
  },
}
const films = require('./films.json').Search

it('renders list of titles', () => {
  const query = ''
  store.dispatch(updateFilms(query, films))
  const testInstance = TestRenderer.create(
    <StaticRouter context={{}}>
      <Provider store={store}>
        <FilmList {...defaultProps} />
      </Provider>
    </StaticRouter>,
  )
  expect(testInstance.root.findAllByType(FilmTitle)).toHaveLength(films.length)
})
