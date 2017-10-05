export default {
	Query: {
		items: (root, args, context) => context.database.collection('rsbuddy').find({}, {transactions: false}).toArray(),
		item: async (root, {id}, context) => {
			return (await context.database.collection('rsbuddy').find({id}, {transactions: false}).toArray())[0]
		}
	},
	Item: {
		transactions: async (parent, args, context) => {
			return (await context.database.collection('rsbuddy').find({id: parent.id}, {_id: false, transactions: true}).next()).transactions
		}
	}
}

