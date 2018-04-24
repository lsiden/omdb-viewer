import React from "react"
import ReactDOM from "react-dom"
import OmdbMain from "omdb-main"

import registerServiceWorker from "registerServiceWorker"

ReactDOM.render(<OmdbMain />, document.getElementById("root"))

// Service workers are available only on HTTPS sites.
if (!/https/i.test(global.location.protocol)) {
  registerServiceWorker()
}
