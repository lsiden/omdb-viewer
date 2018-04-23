import React from "react"
import { shallow } from "enzyme"

import { omdbMain as OmdbMain } from "omdb-main"

const createWrapper = () => {
  return shallow(<OmdbMain />)
}

test("OmdbMain", () => {
  expect(createWrapper()).toMatchSnapshot()
})
