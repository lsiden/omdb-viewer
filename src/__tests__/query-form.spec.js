import React from "react"
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux'

import { QueryForm } from "query-form"
import store from 'actions/store'

const onChange = () => {}
const dispatchQueryFetch = () => {}
const clearResults = () => {}

const defaultProps = () => ({
  dispatchQueryFetch,
  onChange,
  clearResults,
})

const createWrapper = (props = {}) => {
  return TestRenderer.create(<QueryForm {...{ ...defaultProps(), ...props }} />)
}

it("renders a Form element", () => {
  const wrapper = createWrapper()
  expect(wrapper.root.findByType("form")).toMatchSnapshot()
})
