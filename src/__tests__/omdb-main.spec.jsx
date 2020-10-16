import React from 'react'
import TestRenderer from 'react-test-renderer'
import { StaticRouter } from 'react-router-dom'

// import { OmdbMainUnconnected as OmdbMain } from 'omdb-main'
import OmdbMain from 'omdb-main'

const createWrapper = () => TestRenderer.create(
  <StaticRouter context={{}}>
    <OmdbMain />
  </StaticRouter>,
)

describe('OmdbMain', () => {
  test('matches snapshot', () => {
    expect(createWrapper()).toMatchSnapshot()
  })
})
