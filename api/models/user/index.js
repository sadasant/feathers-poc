import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    dropDups: true
  },
  // TODO: Company should be a different model
  company: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  }
})

UserSchema.plugin(require('mongoose-bcrypt'))

export const Model = mongoose.model('user', UserSchema)
export const paginate = { default: 30, max: 100 }
export const path = '/user'
export const lean = true

// IMPORTANT: For testing only
// Creating the users
async function maybeCreateUser(user) {
  if (await Model.findOne({ email: user.email })) return
  Model.create(user)
}
maybeCreateUser({
  email: 'admin@admin.admin',
  company: 'admin',
  password: '1234'
})
maybeCreateUser({
  email: 'common@common.common',
  company: 'common',
  password: '1234'
})
