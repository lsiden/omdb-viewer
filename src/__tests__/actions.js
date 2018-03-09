import {
	Actions,
	openList,
	openDetail,
} from 'actions'

it('openList() returns an action', () => {
	expect(openList('url').type).toEqual(Actions.OPEN_LIST)
})

it('openDetail() returns an action', () => {
	expect(openDetail('url').type).toEqual(Actions.OPEN_DETAIL)
})
