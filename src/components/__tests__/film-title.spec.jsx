import React from 'react'
import TestRenderer from 'react-test-renderer'
import { StaticRouter } from 'react-router'

import FilmTitle from 'components/film-title'

const films = require('features/__tests__/films.json').Search

test('renders', () => {
  expect(
    TestRenderer.create(
      <StaticRouter context={{}}>
        <FilmTitle filmSummary={films[0]} />
      </StaticRouter>,
    ),
  ).toMatchSnapshot()
})
