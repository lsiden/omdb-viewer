import React from 'react'
import { create } from 'react-test-renderer'
import { StaticRouter } from 'react-router-dom'

import FilmTitle from 'components/film-title'

const films = require('features/__tests__/films.json').Search

describe('FilmTitle', () => {
  test('matches snapshot', () => {
    expect(
      create(
        <StaticRouter context={{}}>
          <FilmTitle filmSummary={films[0]} />
        </StaticRouter>,
      ),
    ).toMatchSnapshot()
  })
})
