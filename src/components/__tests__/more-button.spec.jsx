import React from 'react'
import { create, act } from 'react-test-renderer';

import { _MoreButton } from 'components/more-button'

const createWrapper = (films=[], totalResults=0, dispatchPageFetch=() => {}) => create(
  <_MoreButton
    dispatchPageFetch={dispatchPageFetch}
    films={films}
    totalResults={totalResults}
  />
).root

describe('MoreButton', () => {
  it('renders null if no films', () => {
    const wrapper = createWrapper()
    expect(wrapper.findAllByType('button').length).toBe(0)
  })

  it('renders null if films.length <= totalResults', () => {
    const films = Array(3)
    const wrapper = createWrapper(films, films.length)
    expect(wrapper.findAllByType('button').length).toBe(0)
  })

  it('matches snapshot if films.length < totalResults', () => {
    const films = Array(3)
    expect(createWrapper(films, films.length+1)).toMatchSnapshot()
  })

  it('calls dispatchPageFetch', () => {
    const dispatchPageFetch = jest.fn()
    const films = Array(3)
    const wrapper = createWrapper(films, films.length+1, dispatchPageFetch)
    const btn = wrapper.findByType('button')
    act(btn.props.onClick)
    expect(dispatchPageFetch.mock.calls.length).toBe(1)
  })
})
