
const xtpl = require('xtpl');
const path = require('path')
const databasetool = require(path.join(__dirname,'../tools/databasetool.js'))


/**
 * 
 * 最终处理，
 */

exports.getStudentListPage = (req, res) => {
     const keyword = req.query.keyword || ''
    //调用databasetool.findList的方法，拿到数据，渲染列表页面，返回给浏览器

    databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{

        xtpl.renderFile(path.join(__dirname, "../statics/view/list.html"), {
            students:docs
        }, function (error, content) {
            //console.log(content)
            res.send(content)
        });
    })


     
   

}


