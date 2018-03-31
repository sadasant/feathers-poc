export const path = '/signup'
export const setup = () => null
export const post = (data, { connection }) => {
  console.log('SIGNUP', { data, connection })
}
