import { updateFilms, updateIsFetching } from 'actions'
import Actions from 'actions/types'

test('updateFilms(list)', () => {
  const films = ['foo', 'bar']
  const query = 'foobar'
  expect(updateFilms(query, films)).toMatchObject({
    type: Actions.UPDATE_FILMS,
    data: {
      films,
      query,
      pageNum: 1,
    },
  })
})
