import _ from 'lodash/fp'
import { readdirSync } from 'fs'
import service from 'feathers-mongoose'

export const init = app =>
  readdirSync(__dirname)
    .filter(_.negate(_.endsWith('.js')))
    .map(name => require(__dirname + '/' + name))
    .map(({ path, ...props }) => app.use(path, service(props)))
