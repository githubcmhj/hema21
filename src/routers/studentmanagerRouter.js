// //导入
 const express = require('express')
 const path = require('path')

 const studentManagerRouter = express.Router()
// //导入studentManagerController
 const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentmanageController.js"))
// //处理具体请求
studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage)

// //导出
module.exports = studentManagerRouter