import toastr from 'toastr'
import axios from 'axios'
import debugFactory from 'debug'

import {APP_NAME} from './constants'

const debugString = `${APP_NAME}:actions:debug`
const debug = debugFactory(debugString)

export const Actions = {
	VIEW_LIST: 'view-list',
	VIEW_DETAIL: 'view-detail',
	UPDATE_FILMS: 'update-films',
}

// TODO get rid of returns
export const viewList = () => {
	return {
		type: Actions.VIEW_LIST,
		data: {
			view: Actions.VIEW_LIST
		},
	}
}

export const viewDetail = (film) => {
	return {
		type: Actions.VIEW_DETAIL,
		data: {
			view: Actions.VIEW_DETAIL,
			film,
		}
	}
}

export const updateFilms = (films) => {
	debug('updateFilms(%s)', films)
	return {
		type: Actions.UPDATE_FILMS,
		data: {films}
	}
}

export const queryFetch = (query) => {
	debug('queryFetch(%s)', query)
	return dispatch => (
		axios.get(`https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}`) .then(res => {
			dispatch(updateFilms(res.data.Search))
		}).catch(e => {
			console.error(e)
			toastr.error(e, 'An error occured')
		})
	)
}
