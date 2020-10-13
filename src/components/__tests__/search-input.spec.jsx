import React from 'react'
import { create } from 'react-test-renderer';

import SearchInput from 'components/search-input'

const defaultProps = () => ({
  onCancelClick: () => {},
  onChange: () => {},
  placeholder: 'placeholder',
  value: 'value',
})

describe('SearchInput', () => {
  const createWrapper = () => create(
    <SearchInput {...defaultProps()} />
  )

  test('SearchInput', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})
