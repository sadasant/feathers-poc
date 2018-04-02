import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'

export default () => {
  const app = feathers()
  require('./socketio').init(app)
  app.configure(auth())
  return app
}
