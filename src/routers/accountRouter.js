//导入express
const express = require('express')
const path = require('path')
const  bodyParser = require('body-parser')

//2 创建路由对象
const accountRouter = express.Router()

//导入控制器
const accountCTRL = require(path.join(__dirname, '../controllers/accountController.js'))
//3 处理具体的请求

//3.1获取登陆页面的请求
accountRouter.get('/login',accountCTRL.getLoginPage )
//3.2获取注册页面的请求
accountRouter.get('/register',accountCTRL.getRegisterPage )

//3.3处理注册请求
accountRouter.post('/register',accountCTRL.register  )
//3.4获取图片验证码
accountRouter.get('/vcode',accountCTRL.getVcodeImage)
//3.5处理登陆
accountRouter.post('/login',accountCTRL.login   )

//4 导出
module.exports = accountRouter