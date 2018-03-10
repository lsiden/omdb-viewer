import React from 'react'
import { shallow } from 'enzyme'

import 'test-helpers/setup'
import { ButtonLink } from 'components/button-link'

let onClick

const defaultProps = () => ({
	onClick: onClick,
})

const buttonContents = 'Push Me'

const createWrapper = (props={}) => {
	onClick = jest.fn()
	return shallow(
		<ButtonLink {...{...defaultProps(), ...props}}>
			{buttonContents}
		</ButtonLink>
	)
}

it('renders children', () => {
	const wrapper = createWrapper()
	expect(wrapper.text()).toEqual(buttonContents)
})

test('click event invokes onClick()', () => {
	const wrapper = createWrapper()
	wrapper.simulate('click')
	expect(onClick).toHaveBeenCalled()
})
