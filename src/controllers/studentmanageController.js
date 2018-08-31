const xtpl = require('xtpl');
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhm21';

/**
 * 
 * 最终处理，
 */

exports.getStudentListPage = (req, res) => {

    // Use connect method to connect to the server
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        //拿到db对象
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('studentInfo')
        //查询
        collection.find({}).toArray((err, docs) => {
            //console.log(docs)
            //关闭与数据库的链接
            /**
             * 参数1：渲染数据的路径，最终找到list.html是根据觉得路径去找
             * 参数2：渲染页面所需要的数据
             * 参数3：渲染完毕之后的结果
             */
            client.close();
            xtpl.renderFile(path.join(__dirname, "../statics/view/list.html"), {
                students:docs
            }, function (error, content) {
                //console.log(content)
                res.send(content)
            });

        })
       
    });

   

}