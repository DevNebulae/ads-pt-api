import express from "express"
import cors from "cors"
import { graphqlExpress, graphiqlExpress } from "graphql-server-express"
import bodyParser from "body-parser"
import { MongoClient } from "mongodb"

import schema from "./schema"

const MONGO_URL = "mongodb://localhost:27017/rsbuddy"
const PORT = 7700
const app = express()

app.use(
  "*",
  cors({
    origin: "http://localhost:8000"
  })
)

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(async () => ({
    schema,
    context: {
      database: await MongoClient.connect(MONGO_URL)
    }
  }))
)

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
)

export { app, MONGO_URL, PORT }
