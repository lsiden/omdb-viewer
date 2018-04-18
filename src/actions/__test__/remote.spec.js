import { queryFetch, fetchFilmDetails } from "actions/remote"
import Actions from "actions/types"

import filmDetails from "__tests__/film-detail.json"

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
