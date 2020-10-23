import React from 'react'

import About from 'features/about'
import { createWithContext } from 'helpers/test-helpers'

const onClick = () => {}
const createWrapper = () => createWithContext(<About onClick={onClick} />)

describe('OmdbMain', () => {
  test('matches snapshot', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})
