/*
 * I discovered that OMDB search can return some duplicate films.
 * This will cause React to throw a warning when it discovers a duplicate key.
 * So we have to guard against duplicate items.
 */
const reduceUniqueFilms = (res, film) => {
  res[film.imdbID] = film
  return res
}

export function updateNewFilms(state, data) {
  return {
    ...state,
    films: (data.films || []).reduce(reduceUniqueFilms, {}),
    totalResults: parseInt(data.totalResults || '0'),
  }
}

export function appendFilms(state, data) {
  return {
    ...state,
    films: (data.films || []).reduce(reduceUniqueFilms, { ...state.films || {} })
  }
}

export function getFilms(state) {
  return Object.values(state.films || {})
}
