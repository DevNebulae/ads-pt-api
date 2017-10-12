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
    required: true
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

const Item = mongoose.model("Item", item)

export { item }
export default Item
