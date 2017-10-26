import bodyParser from "body-parser"
import express from "express"
import graphqlHTTP from "express-graphql"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import models from "./db"
import schema from "./graphql"

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
        models
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
