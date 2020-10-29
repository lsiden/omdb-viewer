import React from 'react'
import { shallow } from 'enzyme'

import { FilmListWrapper } from 'features/film-list'

const films = require('./films.json').Search
const defaultProps = () => ({
  query: 'the query',
  films,
  totalResults: films.length,
  isFetching: false,
})

const createWrapper = () => shallow(
  <FilmListWrapper {...defaultProps()} />
)

describe('FilmList', () => {
  it('matches snapshot', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})
