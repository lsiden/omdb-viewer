import {
	Actions,
	viewList,
	updateFilms,
	viewDetail,
	queryFetch,
} from 'actions'

import axios from 'axios'
import debugFactory from 'debug'

import {APP_NAME} from 'constants'

const debugString = `${APP_NAME}:actions:debug`
const debug = debugFactory(debugString)

jest.mock('axios')

test('viewList() returns an action', () => {
	expect(viewList()).toEqual({
		type: Actions.VIEW_LIST,
		data: {
			view: Actions.VIEW_LIST
		}
	})
})

test('updateFilms(list) returns an action with list', () => {
	const films = ['foo', 'bar']
	expect(updateFilms(films)).toEqual({
		type: Actions.UPDATE_FILMS,
		data: {
			films
		}
	})
})

test('viewDetail(film) returns an action with film', () => {
	const film = {Title: 'A Title'}
	expect(viewDetail(film)).toEqual({
		type: Actions.VIEW_DETAIL,
		data: {
			view: Actions.VIEW_DETAIL,
			film,
		},
	})
})

test('queryFetch()(dispatch) invokes dispatch() with Actions.VIEW_LIST', () => {
	const dispatch = jest.fn()
	const response = {
		data: {
			Search: [
				'Rocky Horror',
				'Halloween',
			]
		}
	}
	axios.get.mockReturnValue(Promise.resolve(response))
	queryFetch('a query')(dispatch).then(() => {
		expect(dispatch).toHaveBeenCalledWith({
			type: Actions.UPDATE_FILMS,
			data: {
				films: response.data.Search
			},
		})
	})
})
