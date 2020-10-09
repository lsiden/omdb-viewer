import React from 'react'
import { create, act } from 'react-test-renderer';

import NavButton from 'components/nav-button'

const createWrapper = () => {
  const mockFn = jest.fn()
  return create(
    <NavButton onClick={mockFn}>Press Me</NavButton>,
  )
}

test('matches snapshot', () => {
  expect(createWrapper()).toMatchSnapshot()
})

test('onClick', () => {
  const { root } = createWrapper()
  const btn = root.findByType('button')
  act(btn.props.onClick)
  expect(btn.props.onClick.mock.calls.length).toEqual(1)
})
