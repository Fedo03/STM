var mysql = require('mysql')

var con = mysql.createConnection({
   
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'slash',

})

function members(req,res,next){
    var sql = "SELECT username, userId FROM users"
    con.query(sql,function(err,results){
        if (err) throw err;
        console.log(results)
        res.json(results)
    })

}

module.exports = members