import React from 'react'
import { create } from 'react-test-renderer';

import { _Spinner } from 'components/spinner'

const createWrapper = (busy) => create(
  <_Spinner busy={busy} />
).root

describe('Spinner', () => {
  it('renders null if not busy', () => {
    const wrapper = createWrapper(false)
    expect(wrapper.findAllByType('animate').length).toEqual(0)
  })

  it('renders non-null if busy', () => {
    const wrapper = createWrapper(true)
    expect(wrapper.findAllByType('animate').length).toBeGreaterThan(0)
  })
})
