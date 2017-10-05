import { makeExecutableSchema } from "graphql-tools"
import resolvers from "./resolvers"

const typeDefs = `
	type Transaction {
		ts: String,
		buyingPrice: Int,
		buyingCompleted: Int,
		sellingPrice: Int,
		sellingCompleted: Int,
		overallPrice: Int,
		overallCompleted: Int
	}

	type Item {
		id: Int,
		name: String,
		store: String,
		transactions: [Transaction]
	}

	type Query {
		items: [Item]
		item(id: Int!): Item
	}
`

export default makeExecutableSchema({typeDefs, resolvers})
