import { Schema } from "mongoose"

export const RSBuddy = new Schema({
  ts: {
    type: String
  },
  buyingPrice: {
    type: Number
  },
  buyingCompleted: {
    type: Number
  },
  sellingPrice: {
    type: Number
  },
  sellingCompleted: {
    type: Number
  },
  overallPrice: {
    type: Number
  },
  overallCompleted: {
    type: Number
  }
})
