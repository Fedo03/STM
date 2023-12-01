import { Bubble } from "./txtBuble.js";
import { Img } from "./img.js";
import { Vid } from "./vid.js";


var params = new URLSearchParams(window.location.search)
var id = params.get("id")
var user = params.get('username')
var socket = io()
var i = 1 ;


var send = document.getElementById('sub')
var text = document.getElementById('txtArea')
var list = document.getElementById('list')
var dis = document.getElementById('dis')
var fileBt = document.getElementById('file')
var input =  document.getElementById('text')


dis.style.display = "none"

fileBt.addEventListener('click', function (){
    switch(i) {
        case 1 :
    dis.style.display = "block"
    input.style.display = "none"
    
    i = 2
    break;
         case 2 :
    dis.style.display = "none"
    input.style.display = "block"
    i = 1
    }
})


socket.on('chat', (mess) => {
    var txtBuble = new Bubble(mess.username,
        mess.chat,
        "rgb(87, 85, 85)",
        mess.mesDate.hour,
        mess.mesDate.min);
    text.appendChild(txtBuble)
    text.scrollTop = text.scrollHeight
})

socket.on('image',(image) => {
    console.log(image)
    var src = "./img/" + image.name
    console.log(src)
   var imag = new Img(
    image.username,
    src,
    image.hour,
    image.min)
   text.appendChild(imag)
   text.scrollTop = text.scrollHeight
    
})

socket.on('video', (data) => {

    var vidPath = "./vid/" + data.src

    var vid = new Vid(data.username ,
         vidPath,
         false,
         data.hour,
         data.min)
    text.appendChild(vid)
    text.scrollTop = text.scrollHeight
    console.log(vidPath)
})


send.addEventListener("click",function(){
    var date = new Date()
    console.log(date)
    
    var img = document.getElementById('img')
    var vid = document.getElementById('vid')
    var vidInfo = vid.files[0]
    var file = img.files[0]
    var message = {
        chat : "",
        userId : id,
        username : user,
        mesDate : {
        year : date.getFullYear(),
        month :date.getMonth() + 1,
        day : date.getDate() ,
        hour : date.getHours(),
        min : date.getMinutes()
        }
    }

    console.log(message.mesDate)
    
    if((input.value)) {
    message.chat = input.value
    console.log(message)
    var owner = new Bubble(
        "you",
    message.chat,
    "rgb(166, 166, 166)",
    message.mesDate.hour,
    message.mesDate.min
    )
    console.log(owner)
    text.appendChild(owner)
    text.scrollTop = text.scrollHeight
    socket.emit("chat", message)
} 
else if(file){
        var reader = new FileReader()
        reader.onload = (e) => {
         
        message.chat = {
                data : e.target.result,
                name : file.name
            }
         console.log(e.target.result)

        var images = new Img("you", 
        e.target.result,
        message.mesDate.hour,
        message.mesDate.min)

        text.appendChild(images)
        text.scrollTop = text.scrollHeight

            socket.emit("image", message)
        }
        reader.readAsDataURL(file);
    }


     else if(vidInfo) {
        console.log(vidInfo)
        if(vidInfo.size < 1000000) {
        
        var reads = new FileReader()


         reads.onload = (e) => {

            message.chat = {
                src : e.target.result ,
                name : vidInfo.name
            }
            socket.emit("video", message)
            console.log(vidInfo.name)

            


            var video = new Vid("you",
            e.target.result,
            true,
            message.mesDate.hour,
            message.mesDate.min)
            text.appendChild(video)
            text.scrollTop = text.scrollHeight
            console.log(e.target.result)
        }
        reads.readAsArrayBuffer(vidInfo);
    } else {
        alert("file is to large")
    }
    }

    input.value = ''
    img.value = ''
    vid.value = ''
    dis.style.display = "none"
    input.style.display = "block"
})

fetch('/members').then((res) => {
    return res.json()
}).then((data)=> {
    console.log(data)
  
    for(var i = 0; i < data.length ; i++) {
        
            var listI = document.createElement('li')
        
         console.log(data[i].username)
       
        
        listI.innerHTML = data[i].username + "<br>"
        list.style.marginLeft = "0px"
        list.appendChild(listI)
    }
    

})

 var uData = {
    userId : id ,
    username : user
 }

 var uData_sent = {
    method : "POST",
    headers : {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(uData)
 }

fetch('hChats', uData_sent).then((res) => {

    return res.json()

}).then((data) => {
    console.log(data)

    data.forEach(item => {
    if(item.post) {

        if(item.userId == id) {
            var owner = new Bubble(
            "you",
            item.post,
        "rgb(166, 166, 166)",
        item.time,
        item.date
        )

        text.appendChild(owner)
    text.scrollTop = text.scrollHeight

    } else {

        
        var txt =  new Bubble(item.username,
            item.post,
            "rgb(87, 85, 85)",
            item.time,
            item.date
            );


            text.appendChild(txt)
            text.scrollTop = text.scrollHeight
        }
        
    } else if(item.img){
        console.log(item.im)
        var src = "./img/" + item.img

        var imag = new Img(
            item.username,
            src,
            item.time,
            item.date
            )
           text.appendChild(imag)
           text.scrollTop = text.scrollHeight

    } else if(item.vid) {

        var vidPath = "./vid/" + item.vid

    var vid = new Vid(item.username ,
         vidPath,
         false,
         item.time,
         )
    text.appendChild(vid)
    text.scrollTop = text.scrollHeight

    }

})
    

})

