module.exports = {
  isNotLogin (req, res, next) {
    if (!req.session.author) {
      return res.json(
        {err_code: 0, message: '未登录', isLogin: false}
      )
    }
    next()
  },
  isLogin (req, res, next) {
    if (req.session.author) {
      return res.json(
        {err_code: 0, message: '已登录', isLogin: true}
      )
    }
    next()
  }
}
