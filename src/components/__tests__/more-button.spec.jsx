import React from 'react'
import { create, act } from 'react-test-renderer';

import { _MoreButton } from 'components/more-button'

it('matches snapshot', () => {
  const wrapper = create(<_MoreButton dispatchPageFetch={jest.fn()} />)
  expect(wrapper).toMatchSnapshot()
})

it('calls dispatchPageFetch', () => {
  const dispatchPageFetch = jest.fn()
  const { root } = create(<_MoreButton dispatchPageFetch={dispatchPageFetch} />)
  const btn = root.findByType('button')
  act(btn.props.onClick)
  expect(dispatchPageFetch.mock.calls.length).toEqual(1)
})
