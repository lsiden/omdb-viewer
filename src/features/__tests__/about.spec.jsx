import React from 'react'

import About from 'features/about'
import { StaticRouter } from 'react-router-dom'

import { create } from 'react-test-renderer'

const onClick = () => {}

describe('OmdbMain', () => {
  test('matches snapshot', () => {
    expect(
      create(
        <StaticRouter context={{}}>
          <About onClick={onClick} />
        </StaticRouter>,
      ),
    ).toMatchSnapshot()
  })
})
