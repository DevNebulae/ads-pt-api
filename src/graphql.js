import Item from "./graphql/types/item"
import Update from "./graphql/types/update"
import { makeExecutableSchema } from "graphql-tools"

const RuneScapeQuery = `
  type RuneScapeQuery {
    items: [Item]
    item(id: Int!): Item
    updates: [Update]
  }
`

const SchemaDefinition = `
	schema {
		query: RuneScapeQuery
	}
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RuneScapeQuery, Item, Update],
  resolvers: {
    RuneScapeQuery: {
      items: (root, { ids }, { models }) =>
        models.items.find({}, { _id: false, rsbuddy: false }),
      item: (root, { id }, { models }) =>
        models.items.findOne({ id }, { _id: false, rsbuddy: false }),
      updates: (root, args, { models }) =>
        models.updates.find({}, { _id: false })
    },
    Item: {
      rsbuddy: ({ id }, args, { models }) =>
        models.items
          .findOne({ id }, { _id: false, rsbuddy: true })
          .then(tx => tx.rsbuddy)
    }
  }
})
