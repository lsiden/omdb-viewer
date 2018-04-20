import React from "react"
import { shallow } from "enzyme"

import Banner from "components/banner"

const createWrapper = () => shallow(<Banner />)

test("click invokes onClick()", () => {
  expect(createWrapper()).toMatchSnapshot()
})
