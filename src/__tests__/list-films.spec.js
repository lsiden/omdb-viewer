import React from 'react'
import ListFilms from 'list-films'
import { shallow } from 'enzyme'

const defaultProps = () => ({
})

const createWrapper = (props={}) => <ListFilms />

it('renders', () => {
	const wrapper = createWrapper()
})
