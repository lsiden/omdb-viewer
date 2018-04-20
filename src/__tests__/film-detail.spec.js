import React from "react"
import { shallow } from "enzyme"

import { FilmDetail } from "film-detail"

const films = require("./films.json").Search
let dispatchFetchFilmDetails

const defaultProps = () => {
  const filmDetails = films[0]
  const { imdbID } = filmDetails
  dispatchFetchFilmDetails = jest.fn()
  return {
    imdbID,
    filmDetails,
    dispatchFetchFilmDetails,
  }
}

const createWrapper = (props = {}) =>
  shallow(<FilmDetail {...{ ...defaultProps(), ...props }} />)

it("renders a title", () => {
  expect(createWrapper()).toMatchSnapshot()
})
