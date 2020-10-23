import {
  promiseQueryResults,
  promiseQueryPageFetch,
  promiseFilmDetails
} from 'store/async'
import fetchMock from 'fetch-mock-jest'

// Promise.prototype.catch = fn => new Promise((resolve, reject) => reject(fn))

fetchMock.config.overwriteRoutes = true

afterEach(() => fetchMock.reset())

test('promiseQueryResults()(dispatch) invokes dispatch({type: Actions.REPLACE_FILMS})', () => {
  const dispatch = jest.fn()
  const expectResponse = {
    Search: [
      { imdbID: 1, title: 'Rocky Horror' },
      { imdbID: 2, title: 'Halloween' },
    ],
    totalResults: '4',
  }
  fetchMock.once(/.*/, expectResponse)
  return promiseQueryResults('a query')(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test('promiseQueryPageFetch()(dispatch)', () => {
  const dispatch = jest.fn()
  const expectResponse = {
    Search: [
      { imdbID: 3, title: 'Rocky Horror II' },
      { imdbID: 4, title: 'Halloween II' },
    ],
    totalResults: '4',
  }
  fetchMock.once(/.*/, expectResponse)
  return promiseQueryPageFetch()(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})

test('promiseFilmDetails()(dispatch)', () => {
  const dispatch = jest.fn()
  const expectResponse = {
    filmDetails: {
      title: 'a title',
      director: 'Joe Director',
    },
  }
  fetchMock.once(/.*/, expectResponse)
  return promiseFilmDetails('id')(dispatch).then(() => {
    expect(dispatch.mock.calls).toMatchSnapshot()
  })
})
