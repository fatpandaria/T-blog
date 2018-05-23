const express = require('express')
const router = express.Router()
// const checkLogin = require('../middlewares/check')

router.get('/postId', (req, res, next) => {
  console.log('文章详情')
  return {
    success:1
  }
}
)

router.get('/', (req, res, next) => {
  console.log('所有文章列表')
  return res.send({success:1
  })
}
)

router.post('/', (req, res, next) => {
   console.log('发表文章')
  return {
    success:1
  }
}
)

router.put('/:postId', (req, res, next) => {
 console.log('修改文章')
  return {
    success:1
  }
}
)

router.delete('/:postId', (req, res, next) => {
   console.log('删除文章')
  return {
    success:1
  }
}
)

module.exports = router
