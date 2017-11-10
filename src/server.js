import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import graphqlHTTP from "express-graphql"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import models, { sequelize } from "./db"
import schema from "./graphql"

// Constants
const CONFIG = require("./settings.yaml")

const app = express()
app.use(cors())
app.use(
  "/graphql",
  bodyParser.json({
    limit: CONFIG.max_api_call_size
  }),
  graphqlExpress(req => {
    return {
      schema,
      context: {
        loaders: {},
        models,
        sequelize
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
