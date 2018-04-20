import React from "react"
import { shallow } from "enzyme"

import FilmTitle from "film-title"

const films = require("./films.json").Search

const defaultProps = () => ({
  filmSummary: films[0],
})

const createWrapper = (props = {}) =>
  shallow(<FilmTitle {...{ ...defaultProps(), ...props }} />)

test("click on title invokes dispatchViewDetail()", () => {
  expect(createWrapper()).toMatchSnapshot()
})
