import React from 'react'
import { create } from 'react-test-renderer'

import { _FilmDetails } from 'features/film-details'

const filmDetails = require('./film-details.json')
const { imdbID } = filmDetails

describe('FilmDetails', () => {
  it('renders details when present', () => {
    const params = {
      imdbID,
      filmDetails,
      dispatchFetchFilmDetails: jest.fn(),
    }
    const wrapper = create(<_FilmDetails {...params} />)
    expect(wrapper).toMatchSnapshot()

    const root = wrapper.root
    expect(root.findByType('ul')).toBeDefined()
    expect(root.findAllByType('li').length).toBeGreaterThan(0)
    expect(root.findByType('h2').children.includes('The Battle of Algiers')).toBeTruthy()
    expect(root.findAllByType('animate').length).toEqual(0)
  })

  it('renders a spinner when details not present', () => {
    const params = {
      imdbID,
      dispatchFetchFilmDetails: jest.fn(),
    }
    const wrapper = create(<_FilmDetails {...params} />)
    expect(wrapper).toMatchSnapshot()

    const root = wrapper.root
    expect(root.findAllByType('ul').length).toEqual(0)
    expect(root.findAllByType('animate').length).toBeGreaterThan(0)
  })
})
