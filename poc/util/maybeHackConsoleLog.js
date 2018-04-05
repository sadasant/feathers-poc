const prettyJSON = x => {
  if (Array.isArray(x)) return x.map(prettyJSON).join(' ')
  if (typeof x !== 'object') return x
  let result = '<table class="table">'
  for (const [key, value] of Object.entries(x)) {
    result += `<tr><td><b>${key}:</b> ${prettyJSON(value)}</td></tr>`
  }
  return result + '</table>'
}

if (global.document) {
  const doc = window.document
  const log = window.console.log.bind(window.console)
  const queue = []
  window.console.log = (...params) => {
    log(...params)
    queue.push(params)
  }
  setInterval(() => {
    if (!doc.body) return
    let params = queue.shift()
    if (!params) return
    let table = doc.createElement('table')
    table.className = 'table'
    table.innerHTML = params
      .map(prettyJSON)
      .map(x => `<tr><td>${x}</td></tr>`)
      .join('<br/>')
    doc.body.appendChild(table)
  }, 100)
}
