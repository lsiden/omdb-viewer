import {
  viewList,
  updateFilms,
  viewFilmSummary,
  updateIsFetching,
} from "actions"
import Actions from "actions/types"

test("viewList() returns an action", () => {
  expect(viewList()).toEqual({
    type: Actions.VIEW_FILM_LIST,
    data: {
      view: Actions.VIEW_FILM_LIST,
    },
  })
})

test("updateFilms(list)", () => {
  const films = ["foo", "bar"]
  const query = "foobar"
  expect(updateFilms(query, films)).toMatchObject({
    type: Actions.UPDATE_FILMS,
    data: {
      films,
      query,
      pageNum: 1,
    },
  })
})

test("viewFilmSummary(filmSummary)", () => {
  const filmSummary = { Title: "A Title" }
  expect(viewFilmSummary(filmSummary)).toMatchObject({
    type: Actions.VIEW_FILM_DETAIL,
    data: {
      view: Actions.VIEW_FILM_DETAIL,
      filmSummary,
    },
  })
})

test("updateIsFetching(true)", () => {
  expect(updateIsFetching(true)).toMatchObject({
    type: Actions.UPDATE_IS_FETCHING,
    data: {
      isFetching: true,
    },
  })
})

test("updateIsFetching(false)", () => {
  expect(updateIsFetching(false)).toMatchObject({
    type: Actions.UPDATE_IS_FETCHING,
    data: {
      isFetching: false,
    },
  })
})
