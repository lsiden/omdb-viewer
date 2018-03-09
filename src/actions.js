import toastr from 'toastr'
import axios from 'axios'

export const Actions = {
	OPEN_LIST: 'open-list',
	OPEN_DETAIL: 'open-detail',
}

export const openList = (list) => {
	return {
		type: Actions.OPEN_LIST,
		data: {list}
	}
}

export const queryFetch = (searchTerm) => {
	return dispatch => {
		return axios.get(`https://www.omdbapi.com/?apikey=fbfcb8c7&s=${searchTerm}`)
			.then(res => {
				dispatch(openList(res.Search))
			})
			.catch(e => {
				console.error(e)
				toastr.error(e, 'An error occured')
			})
	}
}

export const openDetail = (film) => {
	return {type: Actions.OPEN_DETAIL, data: {film}}
}
