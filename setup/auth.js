import configuration from '@feathersjs/configuration'
import auth from '@feathersjs/authentication'
import jwt from '@feathersjs/authentication-jwt'
import local from '@feathersjs/authentication-local'

const conf = configuration()

export const init = app => {
  let port = conf().port
  app.configure(auth({
    path: '/auth',
    service: 'user',
    secret: 'our-secret',
    jwt: {
     audience: `http://localhost:${port}`,
     issuer: 'feathers',
     expiresIn: '1d'
    }
  }))
  app.configure(local())
  app.configure(jwt())
  app.hooks({
    before: {
      create: [
        auth.hooks.authenticate(['jwt', 'local'])
      ],
      remove: [
        auth.hooks.authenticate(['jwt'])
      ]
    }
  })
}

export const secure = app => {
  app.hooks({
    // Make sure `password` never gets sent to the client
    after: local.hooks.protect('password')
  })
}
