import express from "express"
import graphqlHTTP from "express-graphql"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import bodyParser from "body-parser"
import mongoose, { Schema } from "mongoose"
import schema from "./graphql"
import Item from "./db/item"

// Constants
const HTTP_PORT = 7700

let currentApp = null
const app = express()

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/runescape", {
  useMongoClient: true
})

app.use(
  "/graphql",
  bodyParser.json({
    limit: "15mb"
  }),
  graphqlExpress(() => ({
    schema
  }))
)

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
)

app.listen(HTTP_PORT, () => {
  console.log(`GraphQL-server listening on port ${HTTP_PORT}.`)
})

if (module.hot) {
  module.hot.accept(["./server", "./graphql"], () => {
    server.removeListener("request", currentApp)
    server.on("request", app)
    currentApp = app
  })
}

export { app, HTTP_PORT }
