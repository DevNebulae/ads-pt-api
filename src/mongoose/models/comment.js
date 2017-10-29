import mongoose, { Schema } from "mongoose"

const comment = new Schema({
  timestamp: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

comment.virtual("id").get(function() {
  return this._id
})

const Comments = mongoose.model("Comment", comment)

export { comment }
export default Comments
