import _ from 'lodash/fp'
import Promise from 'bluebird'
import createClient from './util/createClient'
import getUser from './util/getUser'
import colors from 'colors/safe'
const { app, User, Message, Search, countModels, login } = createClient()

require('./util/maybeHackConsoleLog')

async function init() {
  const user = getUser()
  await login(user)
  await countModels()
  if (user.company === 'admin') {
    ;(await Message.find()).data.map(({ _id }) => Message.remove(_id))
  }
  let count = 0
  while (true) {
    try {
      let searchQuery = {
        key: 'root',
        type: 'group',
        schema: 'message',
        join: 'and',
        children: [
          {
            key: 'findByDate',
            type: 'number',
            field: 'createdAt',
            min: new Date(new Date() - 60000).getTime(),
            max: new Date().getTime()
          },
          {
            key: 'results',
            type: 'results',
            sortField: 'createdAt',
            pageSize: 50,
            page: 1
          }
        ]
      }
      let response = _.get(
        'data.0.children.1.context.response',
        await Search.find({ query: searchQuery })
      )
      console.log(colors.cyan('Search Response: %o'), response)
      await Message.create({
        text: new Date(),
        company: count % 2 === 0 ? user.company : undefined
      }).catch(console.error)
      await countModels()
      count++
    } catch (e) {
      console.log(
        colors.red('Failed running everything. Probably disconnected.'),
        e
      )
    }
    await Promise.delay(5000)
  }
}

init().catch(console.error)
