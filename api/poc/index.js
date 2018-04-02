import Promise from 'bluebird'
import createClient from './util/createClient'
import getUser from './util/getUser'
import colors from 'colors/safe'
const { app, User, Message, countModels, login } = createClient()

async function init() {
  const user = getUser()
  await countModels()
  await login(user)
  if (user.company === 'admin') {
    (await Message.find()).data.map(({ _id }) => Message.remove(_id))
  }
  let count = 0
  while (true) {
    try {
      await Message.create({
        text: new Date(),
        company: count % 2 === 0 ? user.company : undefined
      }).catch(console.error)
      await countModels()
      await Promise.delay(5000)
      count++
    } catch(e) {
      console.log(colors.red('Failed running everything. Probably disconnected.'))
    }
  }
}

init().catch(console.error)
