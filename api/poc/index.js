import createClient from './util/createClient'
import { count } from './util/services'
const app = createClient()

let adminUser = {
  email: 'admin@admin.admin',
  password: '1234'
}

const User = app.service('user')
const Message = app.service('message')

async function init() {
  console.log('Users:', await count(User))
  console.log('Messages:', await count(Message))
  await app.authenticate({
    strategy: 'local',
    ...adminUser
  })
  await Message.create({
    text: 'a message'
  })
  console.log('Messages:', await count(Message))
}

init().catch(console.error)
