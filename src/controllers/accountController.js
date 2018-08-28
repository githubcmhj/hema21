/**
 * 
 *最终处理，返回登陆页面给浏览器
 */

 const path = require('path')

exports.getLoginPage = (req,res)=>{

   res.sendFile(path.join(__dirname,'../statics/view/login.html'))

}

exports.getRegisterPage = (req,res)=>{
    // res.send('ok')
    res.sendFile(path.join(__dirname,'../statics/view/register.html'))
}