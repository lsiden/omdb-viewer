import React from "react"
import { shallow } from "enzyme"

import Show from "components/show"

const createWrapper = (props = {}) => shallow(<Show {...props} />)

const children = <div>{"some content"}</div>

it("does not render children when condition is falsy", () => {
  const wrapper = createWrapper({
    when: false,
    children,
  })
  expect(wrapper.children()).toHaveLength(0)
})

it("renders children when condition is truthy", () => {
  const wrapper = createWrapper({
    when: true,
    children,
  })
  expect(wrapper.children()).not.toHaveLength(0)
})
