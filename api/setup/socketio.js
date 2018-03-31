import socketio from '@feathersjs/socketio'
export const init = app => {
  app.configure(socketio(io => {
    io.on('connection', socket => console.log('A CLIENT CONNECTED'))
  }))
}
