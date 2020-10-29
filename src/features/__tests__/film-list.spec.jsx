import React from 'react'
import { createWithContext } from 'helpers/test-helpers'

import { FilmListWrapper } from 'features/film-list'
import FilmTitle from 'components/film-title'

const films = require('./films.json').Search
const defaultProps = () => ({
  query: 'the query',
  films,
  totalResults: films.length,
  isFetching: false,
})

const createWrapper = (props={}) => createWithContext(
  <FilmListWrapper />
).root

describe('FilmList', () => {
  it('matches snapshot', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})
