import mapFolders from '../utils/mapFolders'

export const init = app =>
  mapFolders(__dirname)(({ path, ...props }) => app.use(path, props))
