var sub = document.getElementById('sub')
var pp = document.getElementById('pp')
pp.style.display = 'none'

sub.addEventListener("click", function(){
    var em_na = document.getElementById("na_em").value
    var password = document.getElementById('pass').value

    var data = {
        em_na,
        password
    }

     var formData = {
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
     }
       
     console.log(formData)

     fetch('/login', formData)
     .then((res) => {
        return res.json()
     })
     .then((data)=>{
        

        console.log(data)
        if(data){
         console.log(data[0].UserId +" " + data[0].username)
        location.href = "/chat?id="+data[0].UserId+"&username=" +data[0].username
        } else  {
         pp.style.display = 'block'
        }
     })
})