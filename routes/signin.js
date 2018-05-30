const express = require('express')
const router = express.Router()
const md5 = require('../models/md5.js')
const conn = require('../models/mysql.js')
const checkLogin = require('../middlewares/check.js')
// POST /signin 用户登录

// router.get('/', (req, res, next) => {
//   console.log(checkLogin(req, res).stateCode)
//   if (checkLogin(req, res).stateCode) {
//     console.log(checkLogin(req, res).stateCode)
//     console.log('已登录')
//     return res.json(
//       {err_code: 0, message: '已登录', isLogin: true}
//     )
//   } else {
//     console.log(checkLogin(req, res).stateCode)
//     console.log(req.session.author)
//     return res.json(
//       {err_code: 0, message: '未登录', isLogin: false}
//     )
//   }
// })
// router.use('/isNotLogin', checkLogin.isNotLogin)
// router.use('/isLogin', checkLogin.isLogin)

router.post('/', (req, res, next) => {
  let sqlStr = 'select password from author where author_name = ? '
  req.fields.password = md5(req.fields.password)
  conn.query(sqlStr, req.fields.user, (err, results) => {
    if (err) {
      console.log(err.code)
      return res.json({err_code: 1, message: '数据库错误' + err, isLogin: false})
    } else {
      if (results[0]) {
        if (req.fields.password === results[0].password) {
          console.log(req.fields.user)
          req.session.author = req.fields.user
          return res.json({err_code: 0, message: '登录成功', isLogin: true})
        } else {
          console.log(req.session.author)
          return res.json({err_code: 0, message: '密码错误', isLogin: false})
        }
      } else {
        return res.json({err_code: 0, message: '用户名不存在', isLogin: false})
      }
    }
  })
})

module.exports = router
