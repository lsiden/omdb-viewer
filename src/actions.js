import toastr from 'toastr'
import debugFactory from 'debug'

import {APP_NAME} from './constants'

const debugString = `${APP_NAME}:actions:debug`
const debug = debugFactory(debugString)

export const Actions = {
	VIEW_FILM_LIST: 'view-film-list',
	VIEW_FILM_DETAIL: 'view-film-detail',
	UPDATE_FILMS: 'update-films',
	UPDATE_FILM_DETAILS: 'update-film-details',
}

export const viewList = () => ({
	type: Actions.VIEW_FILM_LIST,
	data: {
		view: Actions.VIEW_FILM_LIST
	},
})

export const viewFilmSummary = (filmSummary) => ({
	type: Actions.VIEW_FILM_DETAIL,
	data: {
		view: Actions.VIEW_FILM_DETAIL,
		filmSummary,
	}
})

export const updateFilmDetails = (filmDetails) => ({
	type: Actions.UPDATE_FILM_DETAILS,
	data: {
		filmDetails,
	}
})

export const updateFilms = (films) => ({
	type: Actions.UPDATE_FILMS,
	data: { films }
})

export const queryFetch = (query) => (dispatch) => (
	fetch(`https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&s=${query}`)
		.then(res => res.json())
		.then(res => dispatch(updateFilms(res.Search)))
		.catch(e => {
			console.error(e)
			toastr.error(e, 'An error occured')
		})
)

export const fetchFilmDetails = (id) => (dispatch) => (
	fetch(`https://www.omdbapi.com/?apikey=fbfcb8c7&type=movie&i=${id}`)
		.then(res => res.json())
		.then(res => dispatch(updateFilmDetails(res.data)))
		.catch(e => {
			console.error(e)
			toastr.error(e, 'An error occured')
		})
)
