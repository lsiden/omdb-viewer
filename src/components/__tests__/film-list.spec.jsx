import React from 'react'

import { _FilmList } from 'components/film-list'

import { shallow } from 'enzyme'

const films = require('features/__tests__/films.json').Search

const createWrapper = () => shallow(
  <_FilmList films={films} />
)

describe('FilmList component', () => {
  it('matches snapshot', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})
