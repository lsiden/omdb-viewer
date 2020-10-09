import React from 'react'

import About from 'features/about'

import TestRenderer from 'react-test-renderer'
import { StaticRouter } from 'react-router'

const onClick = () => {}

test('OmdbMain', () => {
  expect(
    TestRenderer.create(
      <StaticRouter context={{}}>
        <About onClick={onClick} />
      </StaticRouter>,
    ),
  ).toMatchSnapshot()
})
