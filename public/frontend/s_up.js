var submit = document.getElementById("sub");
var pp = document.getElementById("p");
pp.style.display = "none"


submit.addEventListener('click', function(){
    var username = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;

    
    var data ={
        username,
        email,
        password
    }
    console.log(data)

    var dataForm = {
        method : "POST",
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
     
    console.log(dataForm)

    fetch("/signup", dataForm)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data)
        if(data){
        location.href = "/chat?id="+data.id+"&username="+data.username
        } else {
            pp.style.display ="block"

        }
    })
    
})