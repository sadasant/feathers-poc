import _ from 'lodash/fp'
import { readdirSync } from 'fs'

export const init = app =>
  readdirSync(__dirname)
    .filter(_.negate(_.endsWith('.js')))
    .map(name => require(__dirname + '/' + name))
    .map(props => app.hooks(props))
