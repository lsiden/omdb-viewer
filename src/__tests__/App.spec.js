import React from "react"
import ReactDOM from "react-dom"

import App from "App"
import { reduce } from "actions/store"
import Actions from "actions/types"

const films = require("./films.json").Search

test("renders", () => {
  const div = document.createElement("div")
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test("Actions.UPDATE_FILMS", () => {
  const action = { type: Actions.UPDATE_FILMS, data: { films } }
  expect(reduce({}, action)).toEqual(
    expect.objectContaining({
      films,
    })
  )
})
