import { reduce } from "actions/store"
import Actions from "actions/types"

const films = require("__tests__/films.json").Search

test("Actions.VIEW_FILM_LIST", () => {
  const action = {
    type: Actions.VIEW_FILM_LIST,
    data: { view: Actions.VIEW_FILM_LIST },
  }
  expect(reduce({}, action)).toEqual(
    expect.objectContaining({
      view: Actions.VIEW_FILM_LIST,
    })
  )
})

test("Actions.VIEW_FILM_DETAIL", () => {
  const detail = films[0]
  const action = {
    type: Actions.VIEW_FILM_DETAIL,
    data: {
      view: Actions.VIEW_FILM_DETAIL,
      detail,
    },
  }
  expect(reduce({}, action)).toEqual(
    expect.objectContaining({
      view: Actions.VIEW_FILM_DETAIL,
      detail,
    })
  )
})
