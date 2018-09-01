// //导入
 const express = require('express')
 const path = require('path')

 const studentManagerRouter = express.Router()
// //导入studentManagerController
 const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentmanagerController.js"))
// //处理具体请求
studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage)
//获取新增页面
studentManagerRouter.get('/add',studentManagerCTRL.getAddStudentPage)
//完成新增操作
studentManagerRouter.post('/add',studentManagerCTRL.addStudent)
// //导出
module.exports = studentManagerRouter