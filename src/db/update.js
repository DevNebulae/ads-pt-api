import mongoose, { Schema } from "mongoose"

const update = new Schema({
	title: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	content: {
		type: String,
		required: true
	}
})

const Update = mongoose.model('Update', update)

export { update }
export default Update