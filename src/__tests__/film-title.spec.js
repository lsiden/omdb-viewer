import React from 'react'
import { shallow } from 'enzyme'

import 'test-helpers/setup'
import { FilmTitle } from 'film-title'

const films = require('./films.json').Search
let dispatchViewDetail

const defaultProps = () => {
	dispatchViewDetail = jest.fn()
	return {
		filmSummary: films[0],
		dispatchViewDetail
	}
}

const createWrapper = (props={}) => shallow(
	<FilmTitle {...{...defaultProps(), ...props}} />
)

test('click on title invokes dispatchViewDetail()', () => {
	const wrapper = createWrapper()
	wrapper.find('ButtonLink').simulate('click')
	expect(dispatchViewDetail).toHaveBeenCalled()
})
