import React from 'react'
import TestRenderer from 'react-test-renderer';

import { CancelIcon, SearchIcon } from 'components/icons'

test('SearchIcon matches snapshot', () => {
  expect(TestRenderer.create(<SearchIcon />)).toMatchSnapshot()
})

test('CancelIcon matches snapshot', () => {
  expect(TestRenderer.create(<CancelIcon />)).toMatchSnapshot()
})
