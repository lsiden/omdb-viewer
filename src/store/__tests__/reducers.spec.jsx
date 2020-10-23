import { replaceFilms, appendFilms, getFilms } from 'store'
import reduce from 'store/reducers'

const mkFilmItem = (imdbID) => ({
  imdbID,
})

const reduceFilms = (res, id) => {
  res[id] = mkFilmItem(id)
  return res
}

test('replaceFilms() filters duplicates', () => {
  const films = [3, 4, 5, 3].map((id) => mkFilmItem(id))
  const newState = reduce({}, replaceFilms('query', films, films.length))
  const expected = [3, 4, 5].map((id) => mkFilmItem(id))
  expect(getFilms(newState)).toEqual(expected)
})

test('appendFilms() filters duplicates', () => {
  const state = {
    films: [1, 2, 3].reduce(reduceFilms, {}),
  }
  const films = [3, 4, 5, 3].map((id) => mkFilmItem(id))
  const newState = reduce(state, appendFilms(2, films))
  const expected = [1, 2, 3, 4, 5].map((id) => mkFilmItem(id))
  expect(getFilms(newState)).toEqual(expected)
})
