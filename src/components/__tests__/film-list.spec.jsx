import React from 'react'

import { _FilmList } from 'components/film-list'

import { createWithContext } from 'helpers/test-helpers'

const films = require('features/__tests__/films.json').Search

const createWrapper = () => createWithContext(
  <_FilmList films={films} />
).root

describe('FilmList component', () => {
  it('matches snapshot', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})