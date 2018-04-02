module.exports = {
  port: 3001,
  session: {
    secret: 'blog',
    key: 'blog',
    maxAge:100000000
  },
  mongodb: 'mongodb://localhost:27017/blog'
}
