import express from "express"
import graphqlHTTP from "express-graphql"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import bodyParser from "body-parser"
import mongoose, { Schema } from "mongoose"
import schema from "./graphql"
import Item from "./db/item"

// Constants
const CONFIG = require("./settings.yaml")

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(
  `mongodb://${CONFIG.mongo.url}:${CONFIG.mongo.port}/${CONFIG.mongo.database}`,
  {
    useMongoClient: true
  }
)

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

export { app, CONFIG }
