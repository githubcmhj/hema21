const xtpl = require('xtpl');
const path = require('path')
const databasetool = require(path.join(__dirname, '../tools/databasetool.js'))


/**
 * 
 * 最终处理，
 */

exports.getStudentListPage = (req, res) => {
    const keyword = req.query.keyword || ''
    //调用databasetool.findList的方法，拿到数据，渲染列表页面，返回给浏览器

    databasetool.findList('studentInfo', {
        name: {
            $regex: keyword
        }
    }, (err, docs) => {

        xtpl.renderFile(path.join(__dirname, "../statics/view/list.html"), {
            students: docs
        }, function (error, content) {
            //console.log(content)
            res.send(content)
        });
    })
}

/**
 * 
 *最终处理，返回新增页面列表
 */
exports.getAddStudentPage = (req, res) => {
    xtpl.renderFile(path.join(__dirname, "../statics/view/add.html"), {

    }, function (error, content) {
        //console.log(content)
        res.send(content)
    });
}
/**
 * 
 *最终处理，返回新增操作之后德js脚本html(html)
 */
exports.addStudent = (req, res) => {
    console.log(req.body)
    databasetool.insertOne('studentInfo', req.body, (err, result) => {
        if (result == null) {
            res.send('<script>alert("新增失败")</script>')
        } else {
            res.send(`<script>window.location.href = "/studentmanager/list"</script>`)
        }
    })

}