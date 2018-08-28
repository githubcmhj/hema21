//导入express
const express = require('express')
const path = require('path')

//2 创建路由对象
const accountRouter = express.Router()


//3 处理具体的请求
const accountCTRL = require(path.join(__dirname, '../controllers/accountController.js'))
//获取登陆页面的请求
accountRouter.get('/login',accountCTRL.getLoginPage )
//获取注册页面的请求
accountRouter.get('/register',accountCTRL.getRegisterPage )
//4 导出
module.exports = accountRouter