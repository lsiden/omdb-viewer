import React from "react"
import { shallow } from "enzyme"

import { OmdbMainUnconnected as OmdbMain } from "omdb-main"

const createWrapper = () => {
  return shallow(<OmdbMain />)
}

test("OmdbMain", () => {
  expect(createWrapper()).toMatchSnapshot()
})