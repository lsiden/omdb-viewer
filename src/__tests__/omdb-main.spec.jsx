import React from 'react'
import TestRenderer from 'react-test-renderer'
import { StaticRouter } from 'react-router'

// import { OmdbMainUnconnected as OmdbMain } from 'omdb-main'
import OmdbMain from 'omdb-main'

const createWrapper = () => TestRenderer.create(
  <StaticRouter context={{}}>
    <OmdbMain />
  </StaticRouter>,
)

test('OmdbMain', () => {
  expect(createWrapper()).toMatchSnapshot()
})
