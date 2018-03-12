// Wait for web server to start before starting electron

const net = require("net")

/* Foreman will offset the port number by 100 for processes of different types.
 * (See https://github.com/strongloop/node-foreman#advanced-usage.)
 * So, electron-wait-react.js subtracts 100 to set the port number of the React dev server correctly.
 */
const port = process.env.PORT ? process.env.PORT - 100 : 3000
const client = new net.Socket()
let startedElectron = false

process.env.ELECTRON_START_URL = `http://localhost:${port}`

const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end()

    if (!startedElectron) {
      console.log("starting electron")
      startedElectron = true
      const exec = require("child_process").exec
      exec("npm run electron")
    }
  })

tryConnection()

client.on("error", () => {
  setTimeout(tryConnection, 1000)
})
