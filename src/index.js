import "babel-polyfill"
import colors from "colors"
import http from "http"
import models, { sequelize } from "./db"
import { app, CONFIG } from "./server"

async function start() {
  // Variables for hot reloading
  let currentApp = app

  await sequelize.authenticate()
  await sequelize.sync()
  console.info("Database has been initialized".cyan)

  const server = http.createServer(app)

  server.listen(CONFIG.port)
  console.info(`GraphQL-server has been started on port ${CONFIG.port}`.yellow)

  if (module.hot)
    module.hot.accept(["./server"], () => {
      server.removeListener("request", currentApp)
      server.on("request", app)
      currentApp = app
    })
}

start()
