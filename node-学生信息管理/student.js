
var fs = require('fs')

//初始化展示完整学生数据
exports.init = function (callback) {
  fs.readFile('./db.json','utf-8' ,function (err, data) {
    if(err){
      return res.status(500).send('服务器故障')
    }
    callback && callback(data)
  })
}

//添加学生信息
exports.add = function (callback) {
  fs.readFile('./db.json','utf-8' ,function (err, data) {
    if(err){
      return res.status(500).send('服务器故障')
    }
    callback && callback(JSON.parse(data).students)
  })
}
//修改学生信息
exports.updateById = function (id, callback) {
  fs.readFile('./db.json','utf-8' ,function (err, data) {
    if(err){
      return res.status(500).send('服务器故障')
    }
    data = JSON.parse(data).students
    data = data.find(function (item) {
      return item.id == id
    })
    callback && callback( data )
  })
}


exports.update = function (callback) {
  fs.readFile('./db.json', 'utf-8', function (err, data) {
    if(err){
      return res.status(500).send('服务器故障')
    }
    callback && callback(JSON.parse(data).students)
  })
}


exports.deleteById = function (id, callback) {
  fs.readFile('./db.json','utf-8' ,function (err, data) {
    if(err){
      return res.status(500).send('服务器故障')
    }
    data = JSON.parse(data).students
    var index = data.findIndex(function (item) {
      return item.id == id
    })
    data.splice(index,1)
    data = {
      students: data 
    }
    fs.writeFile('./db.json', JSON.stringify(data), function (err) {
      if(err){
        callback(err)
      }
    })
    callback(null)
  })
}
