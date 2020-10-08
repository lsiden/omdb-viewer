import { updateNewFilms, appendFilms } from 'actions/films'

const mkFilmItem = (imdbID) => ({
  imdbID,
})

test('updateNewFilms() filters duplicates', () => {
  const state = {
    films: [1, 2, 3].map((id) => mkFilmItem(id)),
    pageNum: 1,
  }
  const data = {
    films: [3, 4, 5, 3].map((id) => mkFilmItem(id)),
  }
  const newState = updateNewFilms(state, data)
  expect(newState.films.map((film) => film.imdbID).sort()).toEqual([3, 4, 5])
})

test('reduce({APPEND_FILMS, pageNum > 1}) appends films with unique imdbID to existing list', () => {
  const state = {
    films: [1, 2, 3].map((id) => mkFilmItem(id)),
    pageNum: 1,
  }
  const data = {
    films: [3, 4, 5].map((id) => mkFilmItem(id)),
  }
  const newState = appendFilms(state, data)
  const expected = [1, 2, 3, 4, 5]
  expect(newState.films.map((film) => film.imdbID).sort()).toEqual(expected)
})
