import request from 'request-promise'
import io from 'socket.io-client'
import Promise from 'bluebird'

const buildURI = (path = '', port = '3000') => `http://localhost:${port}/${path}`
const get = route => request({ uri: buildURI(route), method: 'GET' })
const post = (route, form) => request({ uri: buildURI(route), method: 'POST', form })

function setupWS() {
  let wsURI = 'http://localhost:3000'
  console.log(wsURI)
  const socket = io(wsURI)
  socket.on('connect', () => console.log('connect'))
  socket.on('event', data => console.log('event', data))
  socket.on('disconnect', () => console.log('event'))
}

async function init() {
  setupWS()
  let text = await get('message')
  await post('message', { text: (new Date()).toString() })
  console.log(text)
}

init()
