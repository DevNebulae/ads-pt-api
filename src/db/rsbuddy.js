import mongoose, { Schema } from "mongoose"

export const rsbuddy = new Schema({
  ts: {
    type: String,
    required: true
  },
  buyingPrice: {
    type: Number,
    min: 0
  },
  buyingCompleted: {
    type: Number,
    min: 0
  },
  sellingPrice: {
    type: Number,
    min: 0
  },
  sellingCompleted: {
    type: Number,
    min: 0
  },
  overallPrice: {
    type: Number,
    min: 0
  },
  overallCompleted: {
    type: Number,
    min: 0
  }
})
