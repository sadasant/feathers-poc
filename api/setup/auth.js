import configuration from '@feathersjs/configuration'
import auth from '@feathersjs/authentication'

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
}
