import { queryFetch, pageFetch, fetchFilmDetails } from 'actions/remote'
import fetchMock from 'fetch-mock-jest'

// Promise.prototype.catch = fn => new Promise((resolve, reject) => reject(fn))

fetchMock.config.overwriteRoutes = true

afterEach(() => fetchMock.reset())

test('queryFetch()(dispatch) invokes dispatch({type: Actions.UPDATE_FILMS})', () => {
  const dispatch = jest.fn()
  const expectResponse = {
    Search: [
      { imdbID: 1, title: 'Rocky Horror' },
      { imdbID: 2, title: 'Halloween' },
    ],
    totalResults: '4',
  }
  fetchMock.once(/.*/, expectResponse)
  return queryFetch('a query')(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test('pageFetch()(dispatch)', () => {
  const dispatch = jest.fn()
  const expectResponse = {
    Search: [
      { imdbID: 3, title: 'Rocky Horror II' },
      { imdbID: 4, title: 'Halloween II' },
    ],
    totalResults: '4',
  }
  fetchMock.once(/.*/, expectResponse)
  return pageFetch()(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test('fetchFilmDetails()(dispatch)', () => {
  const dispatch = jest.fn()
  const expectResponse = {
    filmDetails: {
      title: 'a title',
      director: 'Joe Director',
    },
  }
  fetchMock.once(/.*/, expectResponse)
  return fetchFilmDetails('id')(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})
