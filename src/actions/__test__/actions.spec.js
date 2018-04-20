import { updateFilms, updateIsFetching } from "actions"
import Actions from "actions/types"

test("updateFilms(list)", () => {
  const films = ["foo", "bar"]
  const query = "foobar"
  expect(updateFilms(query, films)).toMatchObject({
    type: Actions.UPDATE_FILMS,
    data: {
      films,
      query,
      pageNum: 1,
    },
  })
})

test("updateIsFetching(true)", () => {
  expect(updateIsFetching(true)).toMatchObject({
    type: Actions.UPDATE_IS_FETCHING,
    data: {
      isFetching: true,
    },
  })
})

test("updateIsFetching(false)", () => {
  expect(updateIsFetching(false)).toMatchObject({
    type: Actions.UPDATE_IS_FETCHING,
    data: {
      isFetching: false,
    },
  })
})
