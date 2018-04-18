import {
  viewList,
  updateFilms,
  viewFilmSummary,
  queryFetch,
  fetchFilmDetails,
} from "actions"
import Actions from "actions/types"

import filmDetails from "__tests__/film-detail.json"

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

test("queryFetch()(dispatch) invokes dispatch() with Actions.VIEW_FILM_LIST", () => {
  const dispatch = jest.fn()
  const response = {
    Search: ["Rocky Horror", "Halloween"],
  }
  response.json = () => Promise.resolve(response)
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(response))
  queryFetch("a query")(dispatch).then(() => {
    expect(dispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_FILMS,
      data: {
        films: response.Search,
      },
    })
  })
})

test("fetchFilmDetails()(dispatch) invokes dispatch() with Actions.UPDATE_FILM_DETAILs", () => {
  const dispatch = jest.fn()
  const response = { filmDetails }
  response.json = () => Promise.resolve(response)
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(response))
  fetchFilmDetails("id")(dispatch).then(() => {
    expect(dispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_FILM_DETAILS,
      data: {
        filmDetails: response,
      },
    })
  })
})
