import React from "react"

import About from "about"

import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'


test("OmdbMain", () => {
  expect(renderer.create(<StaticRouter context={{}}><About/></StaticRouter>)).toMatchSnapshot()
})
