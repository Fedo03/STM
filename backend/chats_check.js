var mysql = require('mysql')

var con = mysql.createConnection({
   
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'slash',

})


function check(req,res,next) {

    var {username,id} = req.query
    console.log(username)
    var cond =username && id

    if(cond) {
        next()
    } else {
        res.redirect('/login')
    }

}

module.exports = check