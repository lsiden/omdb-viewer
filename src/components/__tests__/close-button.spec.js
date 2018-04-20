import React from "react"
import { shallow } from "enzyme"

import { CloseButton } from "components/close-button"

let onClick

const defaultProps = () => {
  onClick = jest.fn()
  return {
    onClick,
  }
}

const createWrapper = (props = {}) =>
  shallow(<CloseButton {...{ ...defaultProps(), ...props }} />)

test("click on close invokes onClick()", () => {
  expect(createWrapper()).toMatchSnapshot()
})
