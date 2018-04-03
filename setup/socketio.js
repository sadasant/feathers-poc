import socketio from '@feathersjs/socketio'
import colors from 'colors/safe'

export const init = app => {
  app.configure(socketio(io => {
    io.on('connection', socket => {
      console.log(colors.green('A CLIENT CONNECTED'))
      socket.emit('news', { text: 'A client connected!' })
    })
  }))
  app.on('login', (payload, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      const { user } = connection;
      console.log(colors.cyan('LOGIN %s'), JSON.stringify(user))
      app.channel(`companies/${user.company}`).join(connection)
      app.channel('public').join(connection)
    }
  })
  app.publish(data => {
    console.log(colors.yellow('PUBLISH %s'), JSON.stringify(data))
    const { company } = data;
    // If the data is associated to a company send it to the company channel
    if (company) {
      return app.channel(`companies/${company}`)
    } else {
      return app.channel('public')
    }
  })
}
