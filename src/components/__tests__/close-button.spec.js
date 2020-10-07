import React from "react"
import TestRenderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'

import { CloseButton } from "components/close-button"

let onClick

const defaultProps = () => {
  onClick = jest.fn()
  return {
    onClick,
  }
}

const createWrapper = () =>
  TestRenderer.create(<StaticRouter>
    <CloseButton { ...defaultProps() } />
  </StaticRouter>)

test("click on close invokes onClick()", () => {
  expect(createWrapper()).toMatchSnapshot()
})
