import { updateNewFilms, appendFilms, getFilms } from 'actions/films'

const mkFilmItem = (imdbID) => ({
  imdbID,
})

const reduceFilms = (res, id) => {
  res[id] = mkFilmItem(id)
  return res
}

test('updateNewFilms() filters duplicates', () => {
  const state = {}
  const data = {
    films: [3, 4, 5, 3].map((id) => mkFilmItem(id)),
  }
  const newState = updateNewFilms(state, data)
  const expected = [3, 4, 5].map((id) => mkFilmItem(id))
  expect(getFilms(newState)).toEqual(expected)
})

test('appendFilms() filters duplicates', () => {
  const state = {
    films: [1, 2, 3].reduce(reduceFilms, {}),
  }
  const data = {
    films: [3, 4, 5, 3].map((id) => mkFilmItem(id)),
  }
  const newState = appendFilms(state, data)
  const expected = [1, 2, 3, 4, 5].map((id) => mkFilmItem(id))
  expect(getFilms(newState)).toEqual(expected)
})
