const express = require('express')
const routes = require('./routes/index.js')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const cors = require('cors') // 直接把access-control-allow-origin 设置为*，对于ajax的cookie发送时不可行的，需要自己定义百名单
const webServer = require('./public/web.js')
const config = require('config-lite')(__dirname) // 会依次降级查找 config/default.js、 config/default.json、config/default.node、config/default.yml、config/default.yaml 并加载。
const path = require('path')
const formidable = require('express-formidable')

const app = express()
// app.use(cors())
// console.log(config)
const sessionStore = new MySQLStore(config.mySQLOptions)
// console.log(config)
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: false, // 强制更新 session
  saveUninitialized: true, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge, // 过期时间，过期后 cookie 中的 session id 自动删除
    secure: false
  },
  store: sessionStore
}))
let corsOptions = {
  origin: 'http://127.0.0.1:3000',
  credentials: true
}
// cors 是真的方便，因为ajax里面设置了withcredentials=true,所以access-allow-origin不能为*，需要自行设置，然后Access-Control-Allow-Credentials （credentials）也必须设置为true
app.use(cors(corsOptions))

app.use(formidable({
  uploadDir: path.join(__dirname, 'uploads/img'),
  keepExtensions: true
}))

routes(app)

app.listen(config.dataPort, () => {
  console.log('data server on http://127.0.0.1:' + config.dataPort)
})

// module.exports = app
