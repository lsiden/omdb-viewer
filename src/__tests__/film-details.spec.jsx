import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import { FilmDetails_ } from 'film-details'
import store from 'actions/store'

const filmDetails = require('./film-details.json')
const { imdbID } = filmDetails

it('renders details when present', () => {
  const params = {
    imdbID,
    filmDetails,
    dispatchFetchFilmDetails: jest.fn(),
  }
  expect(
    TestRenderer.create(
      <FilmDetails_ { ...params } />
    ),
  ).toMatchSnapshot()
})

it('renders a spinner when details not present', () => {
  const params = {
    imdbID,
    dispatchFetchFilmDetails: jest.fn(),
  }
  expect(
    TestRenderer.create(
      <FilmDetails_ { ...params } />
    ),
  ).toMatchSnapshot()
})
