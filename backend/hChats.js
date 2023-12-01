var mysql = require('mysql')

var con = mysql.createConnection({
   
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'slash',

})

function hChats(req,res,next) {
    var {userId,username} = req.body
    console.log(userId)
var sql = "SELECT * FROM users WHERE userId = '"+ userId + "'"
con.query(sql, (err,results) => {
   // if (err) throw err
    console.log(results)
    var time = results[0].time
    var date = results[0].date

    

var sqlT = "SELECT users.userId , users.username , posts.post, posts.date, posts.UserId , posts.time , posts.img , posts.vid " +
"FROM users JOIN posts ON users.userId = posts.UserId WHERE posts.date >= '"+ date +"'"
con.query(sqlT, (err,results) => {
    
    console.log(results)
   res.send(results)
   

})






    next()
})

}

module.exports = hChats

