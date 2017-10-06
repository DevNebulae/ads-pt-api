import { makeExecutableSchema } from "graphql-tools"
import resolvers from "./resolvers"

const typeDefs = require('./graphql/schema.gql')

export default makeExecutableSchema({typeDefs, resolvers})
