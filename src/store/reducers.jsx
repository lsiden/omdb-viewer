import ActionTypes from 'store/const'

/*
 * I discovered that OMDB search can return some duplicate films.
 * This will cause React to throw a warning when it discovers a duplicate key.
 * So we have to guard against duplicate items.
 */
function reduceUniqueFilms(res, film) {
  res[film.imdbID] = film
  return res
}

const reduceNewFilms = (state, data) => ({
  ...state,
  films: (data.films || []).reduce(reduceUniqueFilms, {}),
  totalResults: parseInt(data.totalResults || '0', 10),
  pageNum: 1,
})

const reduceMoreFilms = (state, data) => ({
  ...state,
  films: (data.films || []).reduce(reduceUniqueFilms, { ...state.films || {} }),
  pageNum: data.pageNum,
})

export default function (state={}, action) {
  const { type, data } = action
  switch (type) {
    case ActionTypes.UPDATE_FILM_DETAILS:
    case ActionTypes.UPDATE_IS_FETCHING:
    case ActionTypes.SET_QUERY:
      return {
        ...state,
        ...data,
      }
    case ActionTypes.REPLACE_FILMS:
      return reduceNewFilms(state, data)
    case ActionTypes.APPEND_FILMS:
      return reduceMoreFilms(state, data)
    default:
      return state
  }
}
