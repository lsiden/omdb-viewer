import React from "react"
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'

import { FilmDetail } from "film-detail"

const films = require("./films.json").Search
let dispatchFetchFilmDetails

const createDefaultProps = () => {
  const filmDetails = films[0]
  const { imdbID } = filmDetails
  dispatchFetchFilmDetails = jest.fn()
  return {
    imdbID,
    filmDetails,
    isFetching: false,
    dispatchFetchFilmDetails,
  }
}
const defaultProps = createDefaultProps()

it("renders", () => {
  expect(renderer.create(<StaticRouter context={{}}>
    <FilmDetail {...defaultProps} />
  </StaticRouter>)).toMatchSnapshot()

})

it("renders a spinner if isFetching", () => {
  expect(renderer.create(<StaticRouter context={{}}>
    <FilmDetail isFetching='true' {...defaultProps} />
  </StaticRouter>)).toMatchSnapshot()
})
