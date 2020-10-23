import React from 'react'
import { createWithContext } from 'helpers/test-helpers'

import { _FilmDetails } from 'features/film-details'

const filmDetails = require('./film-details.json')
const { imdbID } = filmDetails

describe('FilmDetails', () => {
  it('renders details when present', () => {
    const params = {
      imdbID,
      filmDetails,
      isFetching: false,
      dispatchFetchFilmDetails: jest.fn(),
      dispatchEraseFilmDetails: jest.fn(),
    }
    const wrapper = createWithContext(<_FilmDetails {...params} />)
    expect(wrapper).toMatchSnapshot()

    const { root } = wrapper
    expect(root.findByType('ul')).toBeDefined()
    expect(root.findAllByType('li').length).toBeGreaterThan(0)
    expect(root.findByType('h2').children.includes('The Battle of Algiers')).toBeTruthy()
    expect(root.findAllByType('animate').length).toEqual(0)
  })

  it('renders a spinner while fetching', () => {
    const params = {
      imdbID,
      isFetching: true,
      dispatchFetchFilmDetails: jest.fn(),
      dispatchEraseFilmDetails: jest.fn(),
    }
    const wrapper = createWithContext(<_FilmDetails {...params} />)
    expect(wrapper).toMatchSnapshot()

    const { root } = wrapper
    expect(root.findAllByType('ul').length).toEqual(0)
    expect(root.findAllByType('animate').length).toBeGreaterThan(0)
  })
})
