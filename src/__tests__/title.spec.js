import React from 'react'
import { shallow } from 'enzyme'

import 'test-helpers/setup'
import Title from 'title'

const films = require('./films.json').Search
const defaultProps = () => ({
	film: films[0]
})

const createWrapper = (props={}) => shallow(
	<Title {...{...defaultProps(), ...props}} />
)

it('renders a title', () => {
	const wrapper = createWrapper()
	expect(wrapper.text()).toEqual(expect.stringContaining(films[0].Title))
})
