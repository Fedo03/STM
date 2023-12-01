var express = require('express');
var stm = express();
var path = require('path')
var socketIO = require('socket.io')
var http = require('http')
var nodemailer = require('nodemailer')
var fs = require('fs')

var hChats = require('./backend/hChats')
var con = require('./backend/dataBase')
var signup = require('./backend/signUp')
var login = require('./backend/login')
var members = require('./backend/memebers')
var check = require('./backend/chats_check')


var server = http.createServer(stm)
let io = socketIO(server)


stm.use(express.static(path.join(__dirname ,'public/frontend')))
stm.use(express.json())


stm.post("/hChats", hChats , function(req,res){
    console.log("texts sent")
})


io.on("connection", (socket) => {
//message
    console.log('user is connected')



    socket.on('chat', (mess) => {
        console.log(mess)

        var date = mess.mesDate.year + "-" + mess.mesDate.month + "-" + mess.mesDate.day
        console.log(date)

        var time = mess.mesDate.hour + ":" + mess.mesDate.min
        console.log(time)

        socket.broadcast.emit("chat",mess)

        var sql = "INSERT INTO posts (post,UserId,date,time) VALUES (?,?,?,?)"
        con.query(sql,[mess.chat,mess.userId,date,time], (err)=> {
            if (err) throw err;
            console.log('inserted!')

        })

    })

    //video
    socket.on('video', (vidI) => {
        console.log("hello")
        console.log(vidI)
        console.log(vidI.chat.src)
         var date = new Date()
         var vidData = Buffer.from(vidI.chat.src, 'base64')
         var vidName =  date.getTime() + vidI.chat.name
         var vidPath = "./public/frontend/vid/" + vidName
         var date = vidI.mesDate.year + "-" + vidI.mesDate.month + "-" + vidI.mesDate.day
         console.log(date)
 
         var time = vidI.mesDate.hour + ":" + vidI.mesDate.min
         console.log(time)

         fs.writeFile(vidPath, vidData, "binary" ,(err) => {
            console.log("file not created : " + err)
         })
            
         console.log(vidName)
    var data = {
        userId : vidI.userId,
        username : vidI.username,
        src : vidName,
        hour : vidI.mesDate.hour,
        min : vidI.mesDate.min
    }



     socket.broadcast.emit("video", data)
       var sql = "INSERT INTO posts (vid,UserId,date,time) VALUES (?,?,?,?)"
        con.query(sql,[vidName,vidI.userId,date,time], (err)=> {
            if (err) throw err;
            console.log('inserted!')
        }) 

       
       })


       //image
    socket.on('image', (file)=>{


        const currentTime = new Date();
        var imageName = currentTime.getTime() + file.chat.name
        var filepath = './public/frontend/img/' + imageName 
        var imageData = file.chat.data
        var date = file.mesDate.year + "-" + file.mesDate.month + "-" + file.mesDate.day
        console.log(date)

        var time = file.mesDate.hour + ":" + file.mesDate.min
        console.log(time)
        
 
        var asciiData = imageData.split(';base64,').pop();
        var buffer = Buffer.from(asciiData,"base64")
        console.log(imageName)
        
        fs.writeFile(filepath, buffer ,(err)=>{
            if(err) {
                console.log("file not created ")
            }
        })

        var userinfo = {
            username : file.username,
            userid : file.userId,
            name : imageName,
            hour : file.mesDate.hour,
            min : file.mesDate.min
        }

        socket.broadcast.emit("image",userinfo)
       var sql = "INSERT INTO posts (img,UserId,date,time) VALUES (?,?,?,?)"
        con.query(sql,[imageName,file.userId,date,time], (err)=> {
            if (err) throw err;
            console.log('inserted!')
        }) 
    })

   
})

stm.get("/members", members , function(req,res){

    console.log('members sent')
})

stm.get("/chat", check,(req,res)=>{
    res.sendFile(path.resolve(__dirname + "/public/frontend/chat.html"));
})

stm.get('/home', function(req,res){
    res.sendFile(path.resolve(__dirname + "/public/frontend/stm.html"));
})

stm.get('/about',function(req,res){
    res.sendFile(path.join(__dirname, "public", "frontend", "abt.html"));
})

stm.get('/signup',function(req,res){
    res.sendFile(path.join(__dirname, "public", "frontend", "s_up.html"));
})

stm.post("/signup", signup , function(req,res){
   
    console.log('it worked')
})

stm.get("/login", function(req,res){
    res.sendFile(path.join(__dirname, "public", "frontend", "l_in.html"))
})

stm.post("/login",login,(req,res)=> {
    
   console.log('successul')
})

var port = process.env.PORT || 5000

server.listen(port, function (){

    console.log("the site is live on " + port  +" http://localhost:5000/home")

})