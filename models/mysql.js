const mysql = require('mysql')
const path = require('path')
const config = require('config-lite')(path.join(__dirname, '../'))
const conn = mysql.createConnection(config.mySQLOptions)
module.exports = conn

// const conn = mysql.createConnection(config.mySQLOptions)
