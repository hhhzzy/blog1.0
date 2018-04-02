module.exports = {
  port: 3002,
  session: {
    secret: 'server',
    key: 'server',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/blog'
}
