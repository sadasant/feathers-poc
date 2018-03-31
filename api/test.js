import request from 'request-promise'

const get = route => request({ uri: `http://localhost:3000/${route}`, method: 'GET' })
const POST = route => request({ uri: `http://localhost:3000/${route}`, method: 'POST' })

async function test() {
  let text = await get('message')
  console.log(text)
}

test()
