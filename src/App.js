import React from "react"
import { Provider } from "react-redux"

import OmdbMain from "omdb-main"
import store from "actions/store"

const App = () => (
  <Provider store={store}>
    <OmdbMain />
  </Provider>
)

export default App
