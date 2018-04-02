import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  company: {
    type: String
  }
})

export const Model = mongoose.model('message', MessageSchema)
export const paginate = { default: 30, max: 100 }
export const path = '/message'
export const lean = true
