import _ from 'lodash/fp'
import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import { count, logAllEvents } from './services'

export default () => {
  const app = feathers()
  require('./socketio').init(app)
  app.configure(auth())

  const User = app.service('user')
  const Message = app.service('message')
  const Search = app.service('search')
  logAllEvents(User)
  logAllEvents(Message)

  async function countModels() {
    console.log('Users:', await count(User))
    console.log('Messages:', await count(Message))
  }

  async function login(user) {
    await app.authenticate({
      strategy: 'local',
      ..._.pick(['email', 'password'], user)
    })
  }

  return {
    app,
    User,
    Message,
    Search,
    countModels,
    login
  }
}
