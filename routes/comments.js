const express = require('express')
const router = express.Router()
const moment = require('moment')
const conn = require('../models/mysql.js')

router.post('/:postId', (req, res, next) => {
  let count = 0
  conn.query('select count(*) as count from comments where  p_Id=' + req.params.postId, (err, results) => {
    if (!err) {
      // console.log(results)
      count = results[0].count
    } else {
      console.log(err)
    }
  })
  // console.log(req.params.postId)
  let SQLStr = 'insert into comments set?'
  let insertData = {
    userId: req.fields.viewer,
    comment: req.fields.comment,
    cmt_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    p_Id: req.params.postId,
    u_email: req.fields.email
  }
  // console.log(insertData)
  if (!hasNull(insertData)) {
    conn.query(SQLStr, insertData, (err, results) => {
      if (!err) {
        console.log(results)
        conn.query('update posts set cmt_num=? where postId=' + req.params.postId,
          count + 1, (err, results) => {
            if (!err) {
              console.log(results)
            } else {
              console.log(err)
              throw new Error('数据库更新错误')
            }
          })
        return res.json({
          err_code: 0, message: '评论成功', status: 'COMMENT_SUCCESS'
        })
      }
      console.log(err)
      return res.json({
        err_code: 1, message: '评论失败', status: 'COMMENT_FAILED'
      })
    })
  } else {
    res.json({
      err_code: 0, message: '标题或内容不能为空', status: 'COMMENT_FAILED'
    })
  }

  function hasNull (obj) {
    if (typeof obj === 'object' && !(obj instanceof Array)) {
      for (let i = 0; i < Object.keys(obj).length; i++) {
        let item = obj[Object.keys(obj)[i]]
        if (!item) return true
      }
    }
    // throw new Error('not an object')
    return false
  }
})

router.get('/:postId', (req, res, next) => {
  let postId = req.params.postId
  let SQLStr = 'select * from comments where p_Id=?'
  conn.query(SQLStr, postId, (err, results) => {
    if (!err) {
      res.json({
        err_code: 0, message: results, status: 'GET_COMMENT_SUCCESS'
      })
    } else {
      res.json({
        err_code: 0, message: '获取评论失败', status: 'GET_COMMENT_FAILED'
      })
    }
  })
})

router.get('/', (req, res, next) => {
  let SQLStr = 'select * from comments '
  conn.query(SQLStr, (err, results) => {
    if (!err) {
      res.json({
        err_code: 0, message: results, status: 'GET_COMMENT_SUCCESS'
      })
    } else {
      res.json({
        err_code: 0, message: '获取评论失败', status: 'GET_COMMENT_FAILED'
      })
    }
  })
})

router.delete('/commentId', (req, res, next) => {
  console.log('删除留言')
}
)

module.exports = router
