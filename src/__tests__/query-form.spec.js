import React from 'react'
import { shallow } from 'enzyme'

import 'test-helpers/setup'
import { QueryForm } from 'query-form'

let onChange

const createWrapper = (props={}) => {
	onChange = jest.fn()
	return shallow(<QueryForm onChange={onChange} {...props} />)
}

it('renders a Form element', () => {
	const wrapper = createWrapper()
	expect(wrapper.find('form')).toHaveLength(1)
})

test('change to input invokes onChange(query)', () => {
	const wrapper = createWrapper()
	const query = 'search term'
	wrapper.find('input').simulate('change', {
		target: {
			value: query
		}
	})
	expect(onChange).toHaveBeenCalledWith(query)
})
