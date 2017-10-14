import Item from "./db/item"
import {default as ItemType} from "./graphql/types/item"
import { makeExecutableSchema } from 'graphql-tools';
import Update from "./graphql/types/update"

const RuneScapeQuery = `
	type RuneScapeQuery {
		items: [Item]
		item(id: Int): Item
		updates: [Update]
	}
`

const SchemaDefinition = `
	schema {
		query: RuneScapeQuery
	}
`

const fetchItem = (id) => Item.findOne({id}, {rsbuddy: false})
const fetchItems = () => Item.find({}, {rsbuddy: false})

export default makeExecutableSchema({
	typeDefs: [
		SchemaDefinition, RuneScapeQuery, ItemType, Update
	],
	resolvers: {
		RuneScapeQuery: {
			items: (root, args) => fetchItems(),
			item: (root, {id}) => fetchItems(id)
		}
	}
})
