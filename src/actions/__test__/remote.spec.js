import { queryFetch, pageFetch, fetchFilmDetails } from "actions/remote"

// Promise.prototype.catch = fn => new Promise((resolve, reject) => reject(fn))

test("queryFetch()(dispatch) invokes dispatch({type: Actions.UPDATE_FILMS})", () => {
  const dispatch = jest.fn()
  fetch.mockResponseOnce(
    JSON.stringify({
      Search: [
        { imdbID: 1, title: "Rocky Horror" },
        { imdbID: 2, title: "Halloween" },
      ],
    })
  )
  return queryFetch("a query")(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test("pageFetch()(dispatch)", () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      Search: ["Rocky Horror 2", "Halloween 2"],
    })
  )
  const dispatch = jest.fn()
  return pageFetch()(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test("fetchFilmDetails()(dispatch)", () => {
  fetch.mockResponseOnce(
    JSON.stringify({
      filmDetails: {
        title: "a title",
        director: "Joe Director",
      },
    })
  )
  const dispatch = jest.fn()
  return fetchFilmDetails("id")(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})
