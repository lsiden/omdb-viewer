import toastr from 'toastr'
import axios from 'axios'

export const Actions = {
	VIEW_LIST: 'view-list',
	VIEW_DETAIL: 'view-detail',
	UPDATE_LIST: 'update-list',
}

export const viewList = () => {
	return {
		type: Actions.VIEW_LIST,
		data: {},
	}
}

export const viewDetail = (film) => {
	return {
		type: Actions.VIEW_DETAIL,
		data: {film}
	}
}

export const updateList = (list) => {
	return {
		type: Actions.VIEW_LIST,
		data: {list}
	}
}

export const queryFetch = (searchTerm) => {
	return dispatch => {
		return axios.get(`https://www.omdbapi.com/?apikey=fbfcb8c7&s=${searchTerm}`)
			.then(res => {
				dispatch(updateList(res.Search))
			})
			.catch(e => {
				console.error(e)
				toastr.error(e, 'An error occured')
			})
	}
}
