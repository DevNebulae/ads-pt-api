import { GraphQLObjectType, GraphQLString } from "graphql"
import Update from "../../db/update"

const UpdateType = new GraphQLObjectType({
  name: "Update",
  description: "...",
  fields: {
    title: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    }
  },
  resolve: (root, args) => Update.find({})
})

export default UpdateType
