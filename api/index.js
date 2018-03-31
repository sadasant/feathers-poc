import { prepare, start } from './setup/express'
const app = prepare()
require('./setup/auth').init(app)
require('./setup/socketio').init(app)
require('./setup/mongoose')
require('./hooks').init(app)
require('./models').init(app)
require('./services').init(app)
start(app)
