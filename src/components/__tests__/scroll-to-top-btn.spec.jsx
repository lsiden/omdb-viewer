import React from 'react'
import { create } from 'react-test-renderer'

import ScrollToTopButton from 'components/scroll-to-top-btn'

const createWrapper = () => create(<ScrollToTopButton />)

describe('ScrollToTopButton', () => {
  it('matches snapshot', () => {
    expect(createWrapper).toMatchSnapshot()
  })
})
