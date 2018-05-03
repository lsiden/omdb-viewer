import React from "react"
import { shallow } from "enzyme"

import { CancelIcon, SearchIcon } from "components/icons"

test("SearchIcon matches snapshot", () => {
  expect(shallow(<SearchIcon />)).toMatchSnapshot()
})

test("CancelIcon matches snapshot", () => {
  expect(shallow(<CancelIcon />)).toMatchSnapshot()
})
