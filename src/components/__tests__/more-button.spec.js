import React from "react"
import TestRenderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'

import { PureMoreButton as MoreButton } from "components/more-button"

const defaultProps = () => ({
  isFetching: false,
  dispatchPageFetch: () => {},
})

const createWrapper = (props = {}) => {
  return TestRenderer.create(<StaticRouter context={{}}>
    <MoreButton {...{ ...defaultProps(), ...props }} />
    </StaticRouter>)
}

it("matches snapshot when not fetching", () => {
  expect(createWrapper({ isFetching: false })).toMatchSnapshot()
})

it("matches snapshot when fetching", () => {
  expect(createWrapper({ isFetching: true })).toMatchSnapshot()
})
