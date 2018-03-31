import mapFolders from '../utils/mapFolders'
import service from 'feathers-mongoose'

export const init = app =>
  mapFolders(__dirname)(({ path, ...props }) => app.use(path, service(props)))
