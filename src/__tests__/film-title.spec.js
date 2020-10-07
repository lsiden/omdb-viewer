import React from "react"
import TestRenderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'

import FilmTitle from "film-title"

const films = require("./films.json").Search

const defaultProps = {
  filmSummary: films[0],
}

test("click on title invokes dispatchViewDetail()", () => {
  expect(TestRenderer.create(<StaticRouter context={{}}>
    <FilmTitle { ...defaultProps } />
  </StaticRouter>)).toMatchSnapshot()
})
