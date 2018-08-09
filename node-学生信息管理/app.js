var express = require('express')
var app = express()
var fs = require('fs')
var router = require('./router')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html', require('express-art-template'))
app
  .use('/node_modules/', express.static('./node_modules/'))
  .use('/public/', express.static('./public/'))
  .use(router)
  .listen('3000', function () {
  console.log('连接服务器成功')
})
