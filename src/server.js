import bodyParser from "body-parser"
import express from "express"
import graphqlHTTP from "express-graphql"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import mongoose from "mongoose"
import schema from "./graphql"
import Items from "./db/item"
import Updates from "./db/update"

// Constants
const CONFIG = require("./settings.yaml")

const app = express()
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
          items: Items,
          updates: Updates
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
