/*
 * I discovered that OMDB search can return some duplicate films.
 * This will cause React to throw a warning when it discovers a duplicate key.
 * So we have to guard against duplicate items.
 */

// TODO refactor this to not update uniqueIds
const reduceUniqueFilms = (uniqueIds, res, film) => {
  const id = film.imdbID

  if (!uniqueIds[id]) {
    res.push(film)
    uniqueIds[id] = id
  }
  return res
}

export function updateNewFilms(state, data) {
  const uniqueIds = {}
  const newFilms = data.films || []
  const films = newFilms.reduce(reduceUniqueFilms.bind(null, uniqueIds), [])
  return {
    ...state,
    ...data,
    uniqueIds,
    films,
  }
}

export function appendFilms(state, data) {
  const newFilms = data.films || []
  const prevFilms = state.films || []
  const uniqueIds = state.uniqueIds
    || prevFilms.reduce((res, film) => {
      const id = film.imdbID

      if (!res[id]) {
        res[id] = id
      }
      return res
    }, {})
  return {
    ...state,
    ...data,
    uniqueIds,
    films: newFilms.reduce(reduceUniqueFilms.bind(null, uniqueIds), [
      ...prevFilms,
    ]),
  }
}
