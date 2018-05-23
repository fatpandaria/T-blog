const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
  console.log('创建留言');
  res.send({success:1
  })
}
)

router.get('/', (req, res, next) => {
  console.log('所有留言');
  res.send({success:1
  })
}
)

router.delete('/commentId', (req, res, next) => {
  console.log('删除留言');

}
)

module.exports = router
