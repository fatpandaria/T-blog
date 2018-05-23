const express = require('express')
const router = express.Router()
const conn = require('../models/mysql.js')
// 写这个的时候遇到一个坑爹bug，就是没有设置SQLyog数据库的字符集，结果就变成了默认的latin，结果我建了表和列，然后我就查到原因可能是因为字没有设置成utf8，然后我就用了SQLyog去alter数据库和表的设置，可是这并没有改变已经创建的列的设置，所以导致我在该数据库重新建表完全没有问题，纠结了好久，后来我就想到了这个可能，就用wamp里面的phpadmin去看了数据库的结构，果然。。。因为sqlyog里面设置了隐藏语言选项（hide language options），所以在那里我没看见列的字符设置。。。所以破案了，吸取教训
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const md5 = require('../models/md5.js')
// 纠结了半天，原来解析form-data的方法早就被封装到了express-formidable 里面，req.files里面保存的就是文件，req.fields里面保存的是text数据

router.post('/', (req, res, next) => {
  req.fields.password = md5(req.fields.password)
  let avatarPath = req.files.avatar._writeStream.path
  let desPath = path.join(__dirname, '../public/img', req.fields.user + '.jpg')
  let sqlStr = 'insert into author set ? '
  let insertData = {
    author_name: req.fields.user,
    password: req.fields.password,
    c_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    avatar: desPath,
    nickname: req.fields.nickname
  }
  if (!hasNull(insertData)) {
    conn.query(sqlStr, insertData, (err, results) => {
      if (err) {
        fs.unlink(avatarPath) // 删除formData传过来的文件
        console.log(err.code)
        if (err.code === 'ER_DUP_ENTRY') {
          return res.json({err_code: 2, message: '用户已存在：' + err, affectedRows: 0})
        }
        return res.json({err_code: 1, message: '数据库错误' + err, affectedRows: 0})
      } else {
        fileTo(avatarPath, desPath)
        req.session.author = req.fields.user
        return res.json({err_code: 0, message: '注册成功'})
      }
    })
  }

  // 移动上传的文件到特定目录，只是为了练习promise和fs，完全可以不用这么写。
  function fileTo (from, to) {
    new Promise((resolve, reject) => {
      fs.readFile(from, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    }).then((data) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(to, data, (err) => {
          if (err) reject(err)
        })
      })
    }).catch((err) => {
      return err
    })
  }

  function hasNull (obj) {
    if (typeof obj === 'object' && !(obj instanceof Array)) {
      Object.keys(obj).forEach((key) => {
        if (!obj[key]) return true
      })
    }
    return false
  }
})
module.exports = router
