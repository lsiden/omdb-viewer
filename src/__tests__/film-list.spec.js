import React from 'react'
import { shallow } from 'enzyme'

import 'test-helpers/setup'
import {FilmList} from 'film-list'

const films = require('./films.json').Search
const defaultProps = () => ({
	films
})

const createWrapper = (props={}) => shallow(
	<FilmList {...{...defaultProps(), ...props}} />
)

it('renders list of titles', () => {
	const wrapper = createWrapper()
	const titles = wrapper.find('Title')
	expect(titles).toHaveLength(films.length)
})
