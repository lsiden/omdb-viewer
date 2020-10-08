import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import QueryForm from 'query-form'
import store from 'actions/store'

const defaultProps = {
  onChange: () => {},
  dispatchQueryFetch: () => {},
  clearResults: () => {},
}

const createWrapper = () => TestRenderer.create(
  <Provider store={store}>
    <QueryForm {...defaultProps} />
  </Provider>,
)

it('renders a Form element', () => {
  expect(createWrapper()).toMatchSnapshot()
})
