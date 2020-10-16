import React from 'react'
import { create } from 'react-test-renderer'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { _FilmList } from 'features/film-list'
import FilmTitle from 'components/film-title'
import store from 'actions/store'

const films = require('./films.json').Search

describe('FilmList', () => {
  it('renders list of titles', () => {
    const dispatchSetQuery = jest.fn()
    const wrapper = create(
      <Provider store={store}>
        <StaticRouter context={{}}>
          <_FilmList
            query="a query"
            films={films}
            totalResults={films.length}
            dispatchSetQuery={dispatchSetQuery}
            isFetching={false}
          />
        </StaticRouter>
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.root.findAllByType(FilmTitle)).toHaveLength(films.length)
    expect(wrapper.root.findAllByType('animate').length).toEqual(0)
  })

  it('if isFetching then displays spinner', () => {
    const dispatchSetQuery = jest.fn()
    const wrapper = create(
      <Provider store={store}>
        <StaticRouter context={{}}>
          <_FilmList
            query="a query"
            totalResults={0}
            dispatchSetQuery={dispatchSetQuery}
            isFetching
          />
        </StaticRouter>
      </Provider>
    )
    expect(dispatchSetQuery.mock.calls.length).toEqual(1)
    expect(wrapper.root.findAllByType('animate').length).toBeGreaterThan(0)
  })
})
