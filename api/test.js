import fetch from 'node-fetch'

const fetchText = async route => (await fetch(`http://localhost:3000/${route}`)).text()

async function test() {
  let text = await fetchText('message')
  console.log(text)
}

test()
