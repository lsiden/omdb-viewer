import {
	Actions,
	openList,
	openDetail,
	queryFetch,
} from 'actions'
import axios from 'axios'

jest.mock('axios')

const films = require('./films.json')

test('openList() returns an action', () => {
	expect(openList([]).type).toEqual(Actions.OPEN_LIST)
})

test('openList(list) returns an action with list', () => {
	const list = ['foo', 'bar']
	expect(openList(list).data.list).toEqual(list)
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
			type: Actions.OPEN_LIST,
			data: {
				list: response.Search
			},
		})
	})
})

test('openDetail() returns an action', () => {
	expect(openDetail().type).toEqual(Actions.OPEN_DETAIL)
})

test('openDetail(film) returns an action with film', () => {
	const film = { foo: 'bar' }
	expect(openDetail(film).data.film).toEqual(film)
})
