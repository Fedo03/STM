var mysql = require('mysql')
var nodemailer = require('nodemailer')

var con = mysql.createConnection({
   
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'slash',

})

function login(req,res,next){
    var {em_na , password} = req.body
    console.log(req.body)

    var date = new Date()
     
   var upDate = {
    year : date.getFullYear(),
    month :date.getMonth() + 1,
    day : date.getDate() ,
    hour : date.getHours(),
    min : date.getMinutes()
   }



  var sql = "SELECT * FROM users WHERE (username = '"+em_na+"' OR email = '"+em_na+"') AND password = '"+password+"'"
  con.query(sql,  function(err,results){
    if (err) throw err
    console.log(results[0])
     
    if(results[0]){
      console.log(results[0])
      res.send(results)
      next()
    } 
    else {
       
        res.json(false)
    }
    console.log(results)
  })
}

module.exports = login