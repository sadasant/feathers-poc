import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
})

export const Model = mongoose.model('message', MessageSchema)
export const paginate = { default: 2, max: 4 }
export const path = '/message'
export const lean = true
