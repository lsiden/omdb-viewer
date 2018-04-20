import React from "react"
import { shallow } from "enzyme"

import ButtonLink from "components/button-link"

let onClick

const defaultProps = () => {
  onClick = jest.fn()
  return {
    onClick,
  }
}

const createWrapper = (props = {}) =>
  shallow(
    <ButtonLink {...{ ...defaultProps(), ...props }}>{"Press Me"}</ButtonLink>
  )

test("click invokes onClick()", () => {
  const wrapper = createWrapper()
  wrapper.simulate("click")
  expect(onClick).toHaveBeenCalled()
})
