import bodyParser from "body-parser"
import express from "express"
import graphqlHTTP from "express-graphql"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import mongoose from "mongoose"
import schema from "./graphql"
import Item from "./db/item"
import Update from "./db/update"

// Constants
const CONFIG = require("./settings.yaml")

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(
  `mongodb://${CONFIG.mongodb.url}:${CONFIG.mongodb.port}/${CONFIG.mongodb
    .database}`,
  {
    useMongoClient: true
  }
)
mongoose.set("debug", true)

app.use(
  "/graphql",
  bodyParser.json({
    limit: "15mb"
  }),
  graphqlExpress(req => {
    return {
      schema,
      context: {
        loaders: {},
        models: {
          items: Item,
          updates: Update
        }
      }
    }
  })
)

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
)

export { app, CONFIG }
