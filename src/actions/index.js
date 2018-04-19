import Actions from "./types"

export const viewList = () => ({
  type: Actions.VIEW_FILM_LIST,
  data: {
    view: Actions.VIEW_FILM_LIST,
  },
})

export const viewFilmSummary = filmSummary => ({
  type: Actions.VIEW_FILM_DETAIL,
  data: {
    view: Actions.VIEW_FILM_DETAIL,
    filmSummary,
  },
})

export const updateFilmDetails = filmDetails => ({
  type: Actions.UPDATE_FILM_DETAILS,
  data: {
    filmDetails,
  },
})

export const updateFilms = (query, films) => ({
  type: Actions.UPDATE_FILMS,
  data: { films, query, pageNum: 1 },
})

export const appendFilms = (pageNum, films) => ({
  type: Actions.APPEND_FILMS,
  data: { films, pageNum },
})

export const updateIsFetching = isFetching => ({
  type: Actions.UPDATE_IS_FETCHING,
  data: { isFetching },
})