import React from 'react'
import TestRenderer from 'react-test-renderer';

import ButtonLink from 'components/button-link'

const defaultProps = {
  onClick: jest.fn(),
}

const createWrapper = () => TestRenderer.create(
  <ButtonLink {...defaultProps}>Press Me</ButtonLink>,
)

test('click invokes onClick()', () => {
  expect(createWrapper()).toMatchSnapshot()
})
