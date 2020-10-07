import React from "react"
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux'

import { OmdbMainUnconnected as OmdbMain } from "omdb-main"
import store from 'actions/store'

const createWrapper = () => {
  return TestRenderer.create(<Provider store={store}><OmdbMain /></Provider>)
}

test("OmdbMain", () => {
  expect(createWrapper()).toMatchSnapshot()
})
