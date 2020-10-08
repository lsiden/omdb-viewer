import React from 'react'
import TestRenderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'

import CloseButton from 'components/close-button'

const createWrapper = () => TestRenderer.create(
  <StaticRouter>
    <CloseButton onClick={jest.fn()} />
  </StaticRouter>,
)

test('CloseButton', () => {
  expect(createWrapper()).toMatchSnapshot()
})
