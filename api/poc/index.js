import Promise from 'bluebird'
import createClient from './util/createClient'
import getUser from './util/getUser'
const { app, User, Message, countModels, login } = createClient()

async function init() {
  const user = getUser()
  await countModels()
  await login(user)
  let count = 0
  while (true) {
    await Message.create({
      text: new Date(),
      company: count % 2 === 0 ? user.company : undefined
    })
    await countModels()
    await Promise.delay(5000)
    count++
  }
}

init().catch(console.error)
