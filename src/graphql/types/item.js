import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from "graphql"
import RSBuddyType from "./rsbuddy"

const ItemType = new GraphQLObjectType({
  name: "Item",
  description:
    "A representation of an in-game item and all of its in-game transactions from multiple sources.",
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    store: {
      type: GraphQLInt
    },
    rsbuddy: {
      type: new GraphQLList(RSBuddyType)
    }
  }
})

export default ItemType
