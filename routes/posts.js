const express = require('express')
const router = express.Router()
const conn = require('../models/mysql.js')
const checkLogin = require('../middlewares/check')
const moment = require('moment')
// const fs = require('fs')
const path = require('path')

// router.use('/isNotLogin', checkLogin.isNotLogin)

router.get('/:postId', (req, res, next) => {
  let SQLStr = 'select * from posts where postId=?'
  // console.log(req.params.postId)
  let postId = path.basename(req.params.postId)
  // console.log(postId + 'teng')
  conn.query(SQLStr, postId, (err, results) => {
    if (!err) {
      // console.log(results)
      let vCount = results[0].view_num + 1
      conn.query('update posts set view_num=? where postId=' + req.params.postId, vCount, (err, results) => {
        if (!err) {
          console.log(results)
        } else {
          console.log(err)
        }
      })
      res.json({
        err_code: 0, message: results, status: 'GET_ARTICLE_SUCCESS'
      })
    } else {
      return res.json({
        err_code: 0, message: '请求文章失败' + err, status: 'GET_ARTICLE_FAILED'
      })
    }
  })
})

router.get('/', (req, res, next) => {
  let SQLStr = 'select * from posts where authorId=?'
  let authorId = req.session.author
  console.log(authorId)
  conn.query(SQLStr, authorId, (err, results) => {
    if (!err) {
      console.log(results)
      res.json(results)
    } else {
      return res.json({
        err_code: 0, message: '请求文章失败' + err, status: 'GET_POSTS_FAILED'
      })
    }
  })
}
)

router.post('/', checkLogin.isNotLogin, (req, res, next) => {
  let SQLStr = 'insert into posts set?'
  let insertData = {
    authorId: req.session.author,
    title: req.fields.title,
    content: req.fields.content,
    pub_time: moment().format('YYYY-MM-DD HH:mm:ss')
  }
  console.log(insertData)
  if (!hasNull(insertData)) {
    conn.query(SQLStr, insertData, (err, results) => {
      if (!err) {
        console.log(results)
        return res.json({
          err_code: 0, message: '发表成功', status: 'PUBLISH_SUCCESS'
        })
      }
      console.log(err)
      return res.json({
        err_code: 1, message: '发表失败', status: 'PUBLISH_FAILED'
      })
    })
  } else {
    res.json({
      err_code: 0, message: '标题或内容不能为空', status: 'PUBLISH_FAILED'
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

router.put('/:postId', (req, res, next) => {
  console.log('修改文章')
  return {
    success:  1
  }
})

router.delete('/:postId', (req, res, next) => {
  console.log('删除文章')
  return {
    success:1
  }
})

module.exports = router
