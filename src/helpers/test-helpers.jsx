import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

/* eslint-disable-next-line import/no-extraneous-dependencies */
import { create } from 'react-test-renderer'

import store from 'store'

export const createWithContext = (ui) => create(
  <Provider store={store}>
    <StaticRouter context={{}}>
      {ui}
    </StaticRouter>
  </Provider>
)
