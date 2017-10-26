import mongoose, { Schema } from "mongoose"
import { rsbuddy } from "./rsbuddy"

const item = new Schema({
  id: {
    type: Number,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  store: {
    type: Number,
    required: true
  },
  rsbuddy: {
    type: [rsbuddy],
    default: []
  }
})

const Items = mongoose.model("Items", item)

export { item }
export default Items
