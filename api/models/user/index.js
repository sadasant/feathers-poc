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
export const paginate = { default: 30, max: 100 }
export const path = '/user'
export const lean = true

// Creating the Admin User
const adminUser = {
  email: 'admin@admin.admin',
  password: '1234'
}
async function createAdminUser() {
  if (await Model.findOne({ email: adminUser.email })) return
  Model.create(adminUser)
}
createAdminUser()
