import { Schema } from "mongoose"

export const Item = new Schema({
  id: {
    type: Number
  },
  start: {
    type: String
  },
  store: {
    type: Number
  }
})
