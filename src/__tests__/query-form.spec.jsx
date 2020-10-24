import React from 'react'

import { _QueryForm } from 'components/query-form'
import { createWithContext } from 'helpers/test-helpers'

const defaultProps = {
  query: '',
  dispatchSetQuery: () => {},
  clearResults: () => {},
}

const createWrapper = (props) => createWithContext(
  <_QueryForm {...{ ...defaultProps, ...props }} />
)

describe('QueryForm', () => {
  it('renders a Form element', () => {
    const dispatchSetQuery = jest.fn()
    const props = {
      query: 'The Fantastic',
      dispatchSetQuery,
    }
    expect(createWrapper(props)).toMatchSnapshot()
  })
})
