import React from 'react'
import { create } from 'react-test-renderer'

import { _SearchStats } from 'components/search-stats'

const createWrapper = (numFetched, numFound) => create(
  <_SearchStats numFetched={numFetched} numFound={numFound} />
).root

describe('SearchStats', () => {
  it('matches snapshot', () => {
    expect(createWrapper(5, 10)).toMatchSnapshot()
  })
})
