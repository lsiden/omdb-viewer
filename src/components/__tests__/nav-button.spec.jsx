import React from 'react'
import TestRenderer from 'react-test-renderer';

import NavButton from 'components/nav-button'

const defaultProps = {
  onClick: jest.fn(),
}

const createWrapper = () => TestRenderer.create(
  <NavButton {...defaultProps}>Press Me</NavButton>,
)

test('click invokes onClick()', () => {
  expect(createWrapper()).toMatchSnapshot()
})
