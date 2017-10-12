import mongoose, { Schema } from "mongoose"

export const rsbuddy = new Schema({
  ts: {
    type: String,
    required: true
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
