import _ from 'lodash/fp'
export const count = async (service, query) => _.get('data.length', await service.find(query))
