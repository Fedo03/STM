var mysql = require('mysql')

var con = mysql.createConnection({
   
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'slash',

})

function signup(req,res,next){
    
var {username, password,email} = req.body
       console.log(req.body)



       var date = new Date()
     
       var upDate = {
        year : date.getFullYear(),
        month :date.getMonth() + 1,
        day : date.getDate() ,
        hour : date.getHours(),
        min : date.getMinutes()
       }

       var time = upDate.hour + ":" + upDate.min
       var dates = upDate.year + "-" + upDate.month + "-" + upDate.day 



    var select = "SELECT * FROM users WHERE email = '"+email+"' AND password = '"+password+"'"

    con.query(select,(err,results)=> {
        console.log(results[0])

   if(!results[0]){

    var insrt = 'INSERT INTO users (username, email,password,time,date) VALUES (?, ?,?,?,?)';

    con.query(insrt,[username,email,password,time,dates], function(err,result){
        if(err){
            res.json(false)
        } else {
            console.log(username + " "+ result.insertId)
            
            res.json({id : result.insertId,
                username : username})
            next()
        }
    })
} else {
    console.log("accout already exists")
    res.json(false)
}
    })

}

module.exports = signup