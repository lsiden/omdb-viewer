import React from 'react'
import TestRenderer from 'react-test-renderer';

import SearchInput from 'components/search-input'

const defaultProps = () => ({
  onCancelClick: () => {},
  onChange: () => {},
  placeholder: 'placeholder',
  value: 'value',
})

// TODO test that onChancelClick and onChange get called

const createWrapper = () => TestRenderer.create(
  <SearchInput {...defaultProps()} />
)

test('SearchInput', () => {
  expect(createWrapper()).toMatchSnapshot()
})
