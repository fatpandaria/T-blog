const express = require('express')
const router = express.Router()

router.use('/', (req, res, next) => {
  if (!req.session.author) {
    return res.json(
      {err_code: 0, message: '未登录', isLogin: false}
    )
  } else {
    return res.json(
      {err_code: 0, message: '已登录', isLogin: true}
    )
  }
}
)
module.exports = router
// 前后端分离的登录验证是个问题，有更好的解决办法，后面再重构一下
