import { prepare, start } from './express'
const app = prepare()
require('./mongoose')
require('./hooks').init(app)
require('./models').init(app)
start(app)
