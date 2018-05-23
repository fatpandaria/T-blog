const express = require('express')
const router = express.Router()
// POST /signup 用户注册
router.get('/', function (req, res, next) {
  console.log('退出登录')
  // req.session.author = null //只是清除了cookie里面的session
  req.session.destroy() // 清除数据库里面的session
  res.json({
    err_code: 0,
    message: '退出登录',
    isLogin: false
  })
})

module.exports = router
