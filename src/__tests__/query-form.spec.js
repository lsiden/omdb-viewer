import React from "react"
import { shallow } from "enzyme"

import "test-helpers/setup"
import { QueryForm } from "query-form"

const onChange = () => {}

const createWrapper = (props = {}) => {
  return shallow(<QueryForm onChange={onChange} {...props} />)
}

it("renders a Form element", () => {
  const wrapper = createWrapper()
  expect(wrapper.find("form")).toHaveLength(1)
})
