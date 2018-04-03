import _ from 'lodash/fp'
import { readdirSync } from 'fs'

export default dir => fn => readdirSync(dir)
  .filter(_.negate(_.endsWith('.js')))
  .map(name => require(dir + '/' + name))
  .map(fn)
