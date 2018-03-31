import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'
import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'

const conf = configuration()

export const prepare = () => {
  let app = express(feathers().configure(conf))
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.configure(express.rest())
  app.configure(socketio(io => {
    io.on('connection', socket => console.log('A CLIENT CONNECTED'))
  }))
  return app
}

export const start = app => {
  let port = conf().port
  app.use(express.errorHandler())
  app.listen(port, () => console.log(`Feathers server listening on port ${port}`))
}
