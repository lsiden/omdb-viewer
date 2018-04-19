import "test-helpers/setup"
import { queryFetch, pageFetch, fetchFilmDetails } from "actions/remote"
import Actions from "actions/types"

function mockFetch(response) {
  window.fetch = jest
    .fn()
    .mockImplementation(() => new Promise(resolve => resolve(response)))
}

// Promise.prototype.catch = fn => new Promise((resolve, reject) => reject(fn))
// Promise.prototype.finally = fn => new Promise(resolve => resolve(fn))

test.skip("queryFetch()(dispatch) invokes dispatch({type: Actions.UPDATE_FILMS})", () => {
  const query = "a query"
  const response = {
    Search: [
      { imdbID: 1, title: "Rocky Horror" },
      { imdbID: 2, title: "Halloween" },
    ],
    json: function() {
      return this
    },
  }
  const dispatch = jest.fn()
  mockFetch(response)
  return queryFetch(query)(dispatch).then(() => {
    const updateFilmsCall = dispatch.mock.calls.find(
      args => args[0].type === Actions.UPDATE_FILMS
    )
    expect(updateFilmsCall.length).toBe(1)
    expect(updateFilmsCall[0].data).toMatchObject({
      query,
      films: response.Search,
      pageNum: 1,
    })
  })
})

test.skip("pageFetch()(dispatch) invokes dispatch() with Actions.VIEW_FILM_LIST", () => {
  const response = {
    Search: ["Rocky Horror 2", "Halloween 2"],
  }
  const dispatch = jest.fn()
  mockFetch(response)
  return pageFetch()(dispatch).then(() => {
    expect(dispatch).toHaveBeenCalledWith({
      type: Actions.APPEND_FILMS,
      data: {
        films: response.Search,
        pageNum: 2,
      },
    })
  })
})

test.skip("fetchFilmDetails()(dispatch) invokes dispatch() with Actions.UPDATE_FILM_DETAILs", () => {
  const filmDetails = {
    title: "a title",
    director: "Joe Director",
  }
  const response = { filmDetails }
  const dispatch = jest.fn()
  mockFetch(response)
  return fetchFilmDetails("id")(dispatch).then(() => {
    expect(dispatch).toHaveBeenCalledWith({
      type: Actions.UPDATE_FILM_DETAILS,
      data: {
        filmDetails: response,
      },
    })
  })
})
