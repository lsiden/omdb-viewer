import React from 'react'
import ListFilms from 'list-films'
import { shallow } from 'enzyme'

import 'test-helpers/setup'

const films = require('./films.json').Search
const defaultProps = () => ({
	films
})

const createWrapper = (props={}) => shallow(
	<ListFilms {...{...defaultProps(), ...props}} />
)

it('renders', () => {
	const wrapper = createWrapper()
})

it('renders list of titles', () => {
	const wrapper = createWrapper()
	const titles = wrapper.find('Title')
	expect(titles).toHaveLength(films.length)
})
