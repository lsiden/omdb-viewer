import React from 'react'
import { create } from 'react-test-renderer';

import { CancelIcon, SearchIcon } from 'components/icons'

describe('SearchIcon', () => {
	test('matches snapshot', () => {
	  expect(create(<SearchIcon />)).toMatchSnapshot()
	})
})

describe('CancelIcon', () => {
	test('matches snapshot', () => {
	  expect(create(<CancelIcon />)).toMatchSnapshot()
	})
})
