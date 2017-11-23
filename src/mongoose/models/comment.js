import mongoose from "mongoose"

const comment = mongoose.Schema({
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
    validate: {
      validator: function(v) {
        return typeof v === "string"
      },
      message:
        "The comment does not seem to be a type of string. I got the value {VALUE} when I at least expected an empty string."
    }
  }
})

comment.virtual("id").get(function() {
  return this._id
})

const Comments = mongoose.model("Comment", comment)

export { comment }
export default Comments
