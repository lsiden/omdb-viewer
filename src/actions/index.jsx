import Actions from './types'

export const updateFilmDetails = (filmDetails) => ({
  type: Actions.UPDATE_FILM_DETAILS,
  data: {
    filmDetails,
  },
})

export const updateFilms = (query = '', films = [], totalResults = 0) => ({
  type: Actions.UPDATE_FILMS,
  data: {
    films, query, totalResults, pageNum: 1,
  },
})

export const appendFilms = (pageNum = 1, films = []) => ({
  type: Actions.APPEND_FILMS,
  data: { films, pageNum },
})

export const setQuery = (query = '') => ({
  type: Actions.SET_QUERY,
  data: { query },
})

export const setFetching = (isFetching = false) => ({
  type: Actions.UPDATE_IS_FETCHING,
  data: { isFetching }
})
