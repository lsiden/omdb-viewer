import React from 'react'
import { createWithContext } from 'helpers/test-helpers'

import { _FilmList } from 'features/film-list'
import FilmTitle from 'components/film-title'

const films = require('./films.json').Search
const defaultProps = () => ({
  query: 'the query',
  films,
  totalResults: films.length,
  isFetching: false,
})

const createWrapper = (props) => createWithContext(
  <_FilmList {...{ ...defaultProps(), ...props }} />
)

describe('FilmList', () => {
  it('renders list of titles', () => {
    const wrapper = createWrapper()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.root.findAllByType(FilmTitle)).toHaveLength(films.length)
  })

  it('if isFetching then displays spinner', () => {
    const wrapper = createWrapper({ isFetching: true })
  })
})
