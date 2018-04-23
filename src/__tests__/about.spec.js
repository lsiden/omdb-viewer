import React from "react"
import { shallow } from "enzyme"

import About from "about"

const createWrapper = () => {
  return shallow(<About />)
}

test("OmdbMain", () => {
  expect(createWrapper()).toMatchSnapshot()
})
