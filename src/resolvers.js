export default {
	Query: {
		items: async (root, {ids}, context) => {
			if (ids)
				return context.database.collection('rsbuddy').find({id: {$in: ids}}).toArray()
			else
				return context.database.collection('rsbuddy').find({}, {transactions: false}).toArray()
		},
		item: (root, {id}, context) => context.database.collection('rsbuddy').findOne({id}, {transactions: false})
	},
	Item: {
		transactions: async (root, args, context) => {
			return (await context.database.collection('rsbuddy').findOne({id: root.id}, {_id: false, transactions: true})).transactions
		}
	}
}
