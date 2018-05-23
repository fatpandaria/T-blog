module.exports = {
  webPort: 3000,
  dataPort: 5000,
  session: {
    secret: 'T-blog',
    key: 'T-blog-key',
    maxAge: 1000 * 60 * 60 * 24
  },
  mySQLOptions: {
    host: 'localhost',
    user: 'root',
    password: 'yuteng1991',
    database: 't-blog',
    connectionLimit: 100 // 最大连接数
  }
}
