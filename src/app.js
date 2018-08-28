//1 导入
const express= require('express')

//2 创建app
const app = express()

//3 集成电路

//4 开启web
app.listen(3000,"127.0.0.1",err=>{
    if(err){
        console.log(err)
    }
    console.log('start ok')
})