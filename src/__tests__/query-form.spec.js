import React from "react"
import { shallow } from "enzyme"

import { QueryForm } from "query-form"

const onChange = () => {}
const dispatchQueryFetch = () => {}
const clearResults = () => {}

const defaultProps = () => ({
  dispatchQueryFetch,
  onChange,
  clearResults,
})

const createWrapper = (props = {}) => {
  return shallow(<QueryForm {...{ ...defaultProps(), ...props }} />)
}

it("renders a Form element", () => {
  const wrapper = createWrapper()
  expect(wrapper.find("form")).toHaveLength(1)
})
