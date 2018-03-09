import React from 'react'
import { shallow } from 'enzyme'

import 'test-helpers/setup'
import { SearchInput } from 'search-input'

let onInput

const defaultProps = () => ({
	id: 'element-id',
	placeholder: 'x',
	value: 'foobar',
	onInput: onInput,
})

const createWrapper = (props={}) => {
	onInput = jest.fn()
	return shallow(<SearchInput {...{...defaultProps(), ...props}} />)
}

test('change to input invokes onChange(query)', () => {
	const wrapper = createWrapper()
	const query = 'search term'
	wrapper.find('input').simulate('input', {
		target: {
			value: query
		}
	})
	setTimeout(() => {
		expect(onInput).toHaveBeenCalledWith(query)
	})
})
