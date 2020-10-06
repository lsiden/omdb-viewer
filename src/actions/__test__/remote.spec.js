import { queryFetch, pageFetch, fetchFilmDetails } from "actions/remote"
import fetchMock from 'fetch-mock'

// Promise.prototype.catch = fn => new Promise((resolve, reject) => reject(fn))

fetchMock.config.overwriteRoutes = true

test("queryFetch()(dispatch) invokes dispatch({type: Actions.UPDATE_FILMS})", () => {
  const dispatch = jest.fn()
  const expectResponse = {
    Search: [
      { imdbID: 1, title: "Rocky Horror" },
      { imdbID: 2, title: "Halloween" },
    ],
  }
  fetchMock.mock('*', expectResponse)
  return queryFetch("a query")(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test("pageFetch()(dispatch)", () => {
  const dispatch = jest.fn()
  const expectResponse = {
    Search: ["Rocky Horror 2", "Halloween 2"],
  }
  fetchMock.mock('*', expectResponse)
  return pageFetch()(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test("fetchFilmDetails()(dispatch)", () => {
  const dispatch = jest.fn()
  const expectResponse = {
    filmDetails: {
      title: "a title",
      director: "Joe Director",
    },
  }
  fetchMock.mock('*', expectResponse)
  return fetchFilmDetails("id")(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})
