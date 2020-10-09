import React from 'react'
import { create } from 'react-test-renderer'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'

import { _FilmList } from 'features/film-list'
import FilmTitle from 'components/film-title'
import store from 'actions/store'

const films = require('./films.json').Search

it('renders list of titles', () => {
  const dispatchSetQuery = jest.fn()
  const testInstance = create(
    <Provider store={store}>
      <StaticRouter context={{}}>
        <_FilmList
          query="a query"
          films={films}
          totalResults={films.length}
          dispatchSetQuery={dispatchSetQuery}
        />
      </StaticRouter>
    </Provider>
  )
  expect(testInstance).toMatchSnapshot()
  expect(testInstance.root.findAllByType(FilmTitle)).toHaveLength(films.length)
})

it('if no films then calls dispatchSetQuery', () => {
  const dispatchSetQuery = jest.fn()
  create(
    <Provider store={store}>
      <StaticRouter context={{}}>
        <_FilmList
          query="a query"
          totalResults={0}
          dispatchSetQuery={dispatchSetQuery}
        />
      </StaticRouter>
    </Provider>
  )
  expect(dispatchSetQuery.mock.calls.length).toEqual(1)
})
