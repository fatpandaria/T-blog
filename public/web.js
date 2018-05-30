const express = require('express')
const path = require('path')
const app = express()

app.use('/node_modules', express.static(path.join(__dirname, '../node_modules/')))
app.use('/public', express.static(__dirname)) // 要用绝对路径，因为这个会被当成包导出，相对路径不起作用
app.get('/', (req, res, next) => {
  res.redirect('/public/index.html')
})

app.listen(3000, () => {
  console.log('static server on http://127.0.0.1:3000')
})

module.exports = app
