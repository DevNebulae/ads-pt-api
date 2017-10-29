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
      items: (root, { ids }, { models }) => models.item.findAll(),
      item: (root, { id }, { models }) => models.item.findById(id),
      updates: (root, args, { models }) => models.update.find({})
    },
    Item: {
      rsbuddy: ({ id }, args, { models }) =>
        models.rsbuddy.findAll({ where: { item_id: id } })
    }
  }
})
