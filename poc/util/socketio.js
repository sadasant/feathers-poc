import _ from 'lodash/fp'
import io from 'socket.io-client'
import socketio from '@feathersjs/socketio-client'

const hostname = _.get('location.hostname', global || window) || 'localhost'

export const init = app => {
  const socket = io(`http://${hostname}:1337`, {
    transports: ['websocket'],
    forceNew: true
  })
  socket.on('connect', () => console.log('connect'))
  socket.on('news', data => console.log('news', data))
  socket.on('disconnect', () => console.log('disconnect'))
  app.configure(socketio(socket))
}
