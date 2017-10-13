import http from "http"
import { app, CONFIG } from "./server"

let currentApp = null
const server = http.createServer(app)
server.listen(CONFIG.port)
console.log(`GraphQL-server listening on port ${CONFIG.port}.`)

if (module.hot) {
  module.hot.accept(["./server", "./graphql"], () => {
    server.removeListener("request", currentApp)
    server.on("request", app)
    currentApp = app
  })
}
