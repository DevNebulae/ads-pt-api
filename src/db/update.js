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

const Updates = mongoose.model("Updates", update)

export { update }
export default Updates
