import React from 'react'
import { createWithContext } from 'helpers/test-helpers'

import CloseButton from 'components/close-button'

const createWrapper = () => createWithContext(<CloseButton />)

describe('CloseButton', () => {
  test('matches snapshot', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})
