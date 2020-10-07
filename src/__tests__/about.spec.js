import React from "react"

import About from "about"

import TestRenderer from "react-test-renderer"
import { StaticRouter } from "react-router"

test("OmdbMain", () => {
  expect(
    TestRenderer.create(
      <StaticRouter context={{}}>
        <About />
      </StaticRouter>
    )
  ).toMatchSnapshot()
})
