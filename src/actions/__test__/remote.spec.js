import { queryFetch, pageFetch, fetchFilmDetails } from "actions/remote"

// Promise.prototype.catch = fn => new Promise((resolve, reject) => reject(fn))

const prepareMockFetch = response => {
  const mockFetch = response =>
    jest.fn().mockImplementation(() => Promise.resolve(response))
  response.json = () => Promise.resolve(response)
  // eslint-disable-next-line no-global-assign
  fetch = mockFetch(response)
}

test("queryFetch()(dispatch) invokes dispatch({type: Actions.UPDATE_FILMS})", () => {
  const dispatch = jest.fn()
  prepareMockFetch({
    Search: [
      { imdbID: 1, title: "Rocky Horror" },
      { imdbID: 2, title: "Halloween" },
    ],
  })
  return queryFetch("a query")(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test("pageFetch()(dispatch)", () => {
  prepareMockFetch({
    Search: ["Rocky Horror 2", "Halloween 2"],
  })
  const dispatch = jest.fn()
  return pageFetch()(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test("fetchFilmDetails()(dispatch)", () => {
  prepareMockFetch({
    filmDetails: {
      title: "a title",
      director: "Joe Director",
    },
  })
  const dispatch = jest.fn()
  return fetchFilmDetails("id")(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})
