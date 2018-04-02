const users = {
  admin: {
    email: 'admin@admin.admin',
    company: 'admin',
    password: '1234'
  },
  common: {
    email: 'common@common.common',
    company: 'common',
    password: '1234'
  }
}

export default () => {
  let type = process.argv[2]
  let user = users[type] || users.common
  console.log(user)
  return user
}
