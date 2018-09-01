/**
 * 
 *最终处理，返回登陆页面给浏览器
 */

const path = require('path')

const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))
const captchapng = require('captchapng');


/**
 * 
 * 最终处理  返回登陆页面给浏览器
 */
exports.getLoginPage = (req, res) => {

    res.sendFile(path.join(__dirname, '../statics/view/login.html'))

}
/**
 * 
 * 最终处理  返回注册页面给浏览器
 */
exports.getRegisterPage = (req, res) => {
    // res.send('ok')
    res.sendFile(path.join(__dirname, '../statics/view/register.html'))
}
/**
 * 
 * 最终处理  把用户名 密码保存起来 并且返回结果给浏览器
 */
exports.register = (req, res) => {

    //console.log(req.body)
    const result = {
        status: 0,
        message: "注册成功"
    }
    //res.json(result)

    databasetool.findOne('accountInfo',{username:req.body.username},(err,doc)=>{
        if (doc) {
           
            //更改返回的状态
            result.status = 1;
            result.message = "用户名已经存在"

            res.json(result)
        } else {
            //2 用户名不存在，则先要把我们的数据插入数据库中，然后返回注册成功给浏览器
            databasetool.insertOne('accountInfo',req.body, (err, result2) => {
              
                if (result2 == null) {
                    result.status = 2;
                    result.message = "注册失败"
                }
                res.json(result)
            })

        }
    })
   
}
/**
 * 最终处理 ，返回图片验证码
 */

exports.getVcodeImage = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000); // width,height,numeric captcha
    //把刚刚随机生成的验证码，存储到session中
    req.session.vcode = vcode

    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
/**
 * 
 *最终处理，登录处理
 */
exports.login = (req, res) => {

     console.log(req.body)
    const result = {
        status: 0,
        message: '登录成功'
    }

    // console.log(req.body)
    //console.log(req.session.vcode)
    if (req.body.vcode != req.session.vcode) {
        result.status = 1
        result.message = "验证码不正确"
        res.json(result)
        return
    }
    //去数据库中，使用username & password去校验
    databasetool.findOne('accountInfo',{username:req.body.username,password:req.body.password},(err,doc)=>{
      
        //console.log(username,password,req.body.username,req.body.password)
        if(doc == null){
            result.status = 2
            result.message = "用户名或密码错误"
        }
        res.json(result)
    })
}
