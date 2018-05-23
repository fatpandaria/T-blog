module.exports = (req, res) => {
  if (!req.session.author) {
    return {
      stateCode: 0,
      message: '用户未登录'
    }
  } else {
    return {
      stateCode: 1,
      message: '用户已登录'
    }
  }
  // checkNotLogin (req, res, next) {
  //   if (req.session.user) {
  //     return {
  //       stateCode: 0,
  //       message: '用户未登录'
  //     }
  //   }
  //   next()
  // }
}
