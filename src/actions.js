export const Actions = {
	OPEN_LIST: 'open-list',
	OPEN_DETAIL: 'open-detail',
}

export const openList = (url) => {
	return { type: Actions.OPEN_LIST, data: {}}
}

export const openDetail = (film) => {
	return { type: Actions.OPEN_DETAIL, data: {}}
}
