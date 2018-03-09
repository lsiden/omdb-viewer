import {
	Actions,
	viewList,
	updateList,
	viewDetail,
	queryFetch,
} from 'actions'
import axios from 'axios'

jest.mock('axios')

test('viewList() returns an action', () => {
	expect(viewList([]).type).toEqual(Actions.VIEW_LIST)
})

test('updateList(list) returns an action with list', () => {
	const list = ['foo', 'bar']
	expect(updateList(list).data.list).toEqual(list)
})

test('viewDetail(film) returns an action with film', () => {
	const film = {Title: 'A Title'}
	expect(viewDetail(film)).toEqual({
		type: Actions.VIEW_DETAIL,
		data: {film},
	})
})

test('queryFetch(searchTerm) calls axios.get with url containing search term and returns a promise', () => {
	const searchTerm = 'my search term'
	const response = {
		Search: [
			'Rocky Horror',
			'Halloween',
		]
	}
	const dispatch = jest.fn()
	axios.get.mockReturnValue(Promise.resolve(response))

	queryFetch(searchTerm)(dispatch).then(() => {
		expect(dispatch).toHaveBeenCalledWith({
			type: Actions.VIEW_LIST,
			data: {
				list: response.Search
			},
		})
	})
})
