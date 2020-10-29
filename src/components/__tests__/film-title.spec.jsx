import React from 'react'
import { createWithContext } from 'helpers/test-helpers'

import FilmTitle from 'components/film-title'

const films = require('features/__tests__/films.json').Search
const createWrapper = () => createWithContext(
  <FilmTitle filmSummary={films[0]} />
).root

describe('FilmTitle', () => {
  test('matches snapshot', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})
