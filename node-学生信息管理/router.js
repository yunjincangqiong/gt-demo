var express = require('express')

var fs = require('fs')
//功能函数实现

var student = require('./student.js')

var router = express.Router()

router.get('/', function (req, res) {
  student.init(function (data) {
    res.render('index.html', {
      students: JSON.parse(data).students
    })
  })
})

router.get('/student/add', function (req, res) {
  student.init(function (data) {
    res.render('add.html', {
      students : data.students
    })
  })
})

router.post('/student/add', function (req, res) {
  student.add(function (data) {
    req.body.id = parseInt(data[data.length - 1].id) + 1
    data.push(req.body)
    dataNew = JSON.stringify({
      students : data
    })
    fs.writeFile('./db.json', dataNew, function (err) {
      if(err){
        return res.status(500).send('服务器故障')
      }
    })
    res.redirect('/')
  })
})


router.get('/student/update', function (req, res) {
  student.updateById(req.query.id, function (data) {
    res.render('update.html', {
      student : data
    })
  })
})

router.post('/student/update', function (req, res) {
  student.update(function (data) {
    var index = data.findIndex(function (item) {
      return item.id == req.body.id
    })

    for(var key in req.body){
      data[index][key] = req.body[key]
    }

    data = {
      students: data
    }
    fs.writeFile('./db.json', JSON.stringify(data), function (err) {
      if(err){
        return res.status(500).send('服务器故障')
      } 
    })

    res.redirect('/')
  })
})

router.get('/student/delete', function (req, res) {
  student.deleteById(req.query.id, function (data) {
    if(data){
      return res.status(500).send('服务器故障')
    }
    res.redirect('/')
  })
})


module.exports = router
