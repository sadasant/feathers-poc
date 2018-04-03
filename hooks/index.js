import mapFolders from '../utils/mapFolders'

export const init = app => mapFolders(__dirname)(props => app.hooks(props))
