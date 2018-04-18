import React from "react"
import { Provider } from "react-redux"

import OmdbSearch from "omdb-viewer"
import store from "actions/store"

const App = () => (
  <Provider store={store}>
    <OmdbSearch />
  </Provider>
)

export default App
