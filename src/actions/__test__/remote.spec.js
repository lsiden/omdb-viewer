import { queryFetch, pageFetch, fetchFilmDetails } from "actions/remote"
import Actions from "actions/types"

function mockFetch(response) {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve(response))
  response.json = () => Promise.resolve(response)
}

test("queryFetch()(dispatch) invokes dispatch() with Actions.VIEW_FILM_LIST", () => {
  const query = "a query"
  const response = {
    Search: ["Rocky Horror", "Halloween"],
  }
  const dispatch = jest.fn()
  mockFetch(response)
  queryFetch(query)(dispatch).then(() => {
    expect(dispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_FILMS,
      data: {
        query,
        films: response.Search,
        pageNum: 1,
      },
    })
  })
})

test("pageFetch()(dispatch) invokes dispatch() with Actions.VIEW_FILM_LIST", () => {
  const response = {
    Search: ["Rocky Horror 2", "Halloween 2"],
  }
  const dispatch = jest.fn()
  mockFetch(response)
  pageFetch()(dispatch).then(() => {
    expect(dispatch).toHaveBeenCalledWith({
      type: Actions.APPEND_FILMS,
      data: {
        films: response.Search,
        pageNum: 2,
      },
    })
  })
})

test("fetchFilmDetails()(dispatch) invokes dispatch() with Actions.UPDATE_FILM_DETAILs", () => {
  const filmDetails = {
    title: "a title",
    director: "Joe Director",
  }
  const response = { filmDetails }
  const dispatch = jest.fn()
  mockFetch(response)
  fetchFilmDetails("id")(dispatch).then(() => {
    expect(dispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_FILM_DETAILS,
      data: {
        filmDetails: response,
      },
    })
  })
})
