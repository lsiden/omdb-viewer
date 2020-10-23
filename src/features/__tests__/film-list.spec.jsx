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
  dispatchSetQuery: () => {},
})

const createWrapper = (props) => createWithContext(
  <_FilmList {...{ ...defaultProps(), ...props }} />
)

describe('FilmList', () => {
  it('renders list of titles', () => {
    const dispatchSetQuery = jest.fn()
    const wrapper = createWrapper({ dispatchSetQuery })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.root.findAllByType(FilmTitle)).toHaveLength(films.length)
    expect(wrapper.root.findAllByType('animate').length).toEqual(0)
    expect(dispatchSetQuery.mock.calls.length).toEqual(1)
  })

  it('if isFetching then displays spinner', () => {
    const wrapper = createWrapper({ isFetching: true })
    expect(wrapper.root.findAllByType('animate').length).toBeGreaterThan(0)
  })

  it('if query non-null, then calls dispatchSetQuery()', () => {

  })
})
