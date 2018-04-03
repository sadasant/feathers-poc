import _ from 'lodash/fp'

export const count = async (service, query) => _.get('data.length', await service.find(query))

export const logAllEvents = service => {
  service.on('created', (...params) => console.log('created', params))
  service.on('updated', (...params) => console.log('updated', params))
  service.on('patched', (...params) => console.log('patched', params))
  service.on('removed', (...params) => console.log('removed', params))
}
