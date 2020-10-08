import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'

import { FilmDetail } from 'film-detail'
import store from 'actions/store'

const films = require('./films.json').Search

const createDefaultProps = () => {
  const filmDetails = films[0]
  const { imdbID } = filmDetails
  return {
    imdbID,
    filmDetails,
    isFetching: false,
    dispatchFetchFilmDetails: jest.fn(),
  }
}
const defaultProps = createDefaultProps()

it('renders', () => {
  expect(
    TestRenderer.create(
      <Provider store={store}>
        <StaticRouter>
          <FilmDetail {...defaultProps} />
        </StaticRouter>
      </Provider>,
    ),
  ).toMatchSnapshot()
})

it('renders a spinner if isFetching', () => {
  const props = { ...defaultProps, isFetching: false }
  expect(
    TestRenderer.create(
      <Provider store={store}>
        <StaticRouter context={{}}>
          <FilmDetail isFetching="true" {...props} />
        </StaticRouter>
      </Provider>,
    ),
  ).toMatchSnapshot()
})
