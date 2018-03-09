import React from 'react'
import { shallow } from 'enzyme'

import 'test-helpers/setup'
import {
	FilmList,
	__RewireAPI__ as FilmListRewireApi,
} from 'film-list'

FilmListRewireApi.__Rewire__('FilmTitle', () => <li />)

const films = require('./films.json').Search
const defaultProps = () => ({
	films
})

const createWrapper = (props={}) => shallow(
	<FilmList {...{...defaultProps(), ...props}} />
)

it('renders list of titles', () => {
	const wrapper = createWrapper()
	const titles = wrapper.find('ul').children()
	expect(titles).toHaveLength(films.length)
})
