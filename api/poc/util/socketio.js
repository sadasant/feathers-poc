import io from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'

export const init = app => {
  const socket = io('http://localhost:3000', {
    transports: ['websocket'],
    forceNew: true
  })
  socket.on('connect', () => console.log('connect'))
  socket.on('news', data => console.log('news', data))
  socket.on('disconnect', () => console.log('disconnect'))
  app.configure(socketio(socket))
}
