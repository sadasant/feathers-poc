export const before = ({ path, type, method }) => console.log('audit', type, path, method)
export const after = before
export const error = before
