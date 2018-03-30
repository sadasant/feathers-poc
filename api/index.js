import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import configuration from '@feathersjs/configuration'

const conf = configuration()
const app = express(feathers().configure(conf))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
require('./mongoose')
require('./models').init(app)
app.use(express.errorHandler())

const port = conf().port
app.listen(port, () => {
  console.log(`Feathers server listening on port ${port}`);
})
