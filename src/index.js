import React from "react"
import ReactDOM from "react-dom"
import OmdbMain from "omdb-main"
import registerServiceWorker from "registerServiceWorker"

ReactDOM.render(<OmdbMain />, document.getElementById("root"))
registerServiceWorker()
