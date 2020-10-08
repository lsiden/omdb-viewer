import React from 'react'
import TestRenderer from 'react-test-renderer';

import SearchInput from 'components/search-input'

const defaultProps = () => ({
  onCancelClick: () => {},
})

const createWrapper = () => TestRenderer.create(<SearchInput {...defaultProps()} />)

test('SearchInput', () => {
  expect(createWrapper()).toMatchSnapshot()
})
