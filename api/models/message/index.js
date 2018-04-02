import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  // Contexture-mongo isn't converting date-strings to dates
  createdAt: { type: Number, default: Date.now }
})
// Otherwise it would be enough with:
// }, { timestamps: true })

export const Model = mongoose.model('message', MessageSchema)
export const paginate = { default: 30, max: 100 }
export const path = '/message'
export const lean = true
