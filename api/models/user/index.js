import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    dropDups: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  }
})

UserSchema.plugin(require('mongoose-bcrypt'))

export const Model = mongoose.model('user', UserSchema)
export const paginate = { default: 2, max: 4 }
export const path = '/user'
export const lean = true
