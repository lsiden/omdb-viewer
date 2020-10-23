import React from 'react'
import { createWithContext } from 'helpers/test-helpers'

import OmdbMain from 'omdb-main'

const createWrapper = () => createWithContext(<OmdbMain />)

describe('OmdbMain', () => {
  test('matches snapshot', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})
