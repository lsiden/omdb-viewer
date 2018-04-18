import { viewList, updateFilms, viewFilmSummary } from "actions"
import Actions from "actions/types"

test("viewList() returns an action", () => {
  expect(viewList()).toEqual({
    type: Actions.VIEW_FILM_LIST,
    data: {
      view: Actions.VIEW_FILM_LIST,
    },
  })
})

test("updateFilms(list) returns an action with list", () => {
  const films = ["foo", "bar"]
  expect(updateFilms(films)).toEqual({
    type: Actions.UPDATE_FILMS,
    data: {
      films,
    },
  })
})

test("viewFilmSummary(filmSummary) returns an action with filmSummary", () => {
  const filmSummary = { Title: "A Title" }
  expect(viewFilmSummary(filmSummary)).toEqual({
    type: Actions.VIEW_FILM_DETAIL,
    data: {
      view: Actions.VIEW_FILM_DETAIL,
      filmSummary,
    },
  })
})
