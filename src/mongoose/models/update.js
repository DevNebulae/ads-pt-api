import mongoose from "mongoose"

const update = mongoose.Schema({
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

update.virtual("id").get(function() {
  return this._id
})

const Updates = mongoose.model("Update", update)

export { update }
export default Updates
