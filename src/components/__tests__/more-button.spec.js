import React from "react"
import { shallow } from "enzyme"

import "test-helpers/setup"
import { PureMoreButton as MoreButton } from "components/more-button"

const defaultProps = () => ({
  isFetching: false,
  dispatchPageFetch: () => {},
})

const createWrapper = (props = {}) => {
  return shallow(<MoreButton {...{ ...defaultProps(), ...props }} />)
}

it("matches snapshot when not fetching", () => {
  expect(createWrapper({ isFetching: false })).toMatchSnapshot()
})

it("matches snapshot when fetching", () => {
  expect(createWrapper({ isFetching: true })).toMatchSnapshot()
})
