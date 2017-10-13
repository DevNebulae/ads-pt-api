import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from "graphql"

const RSBuddyType = new GraphQLObjectType({
  name: "RSBuddy",
  description: "Financial data retrieved from the RSBuddy/OSBuddy API",
  fields: () => ({
    ts: {
      type: GraphQLString
    },
    buyingPrice: {
      type: GraphQLInt
    },
    buyingCompleted: {
      type: GraphQLInt
    },
    sellingPrice: {
      type: GraphQLInt
    },
    sellingCompleted: {
      type: GraphQLInt
    },
    overallPrice: {
      type: GraphQLInt
    },
    overallCompleted: {
      type: GraphQLInt
    }
  }),
  resolve: root => Item.findOne({ id: root.id }, { rsbuddy: true })
})

export default RSBuddyType
