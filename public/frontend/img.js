export class Img {
    constructor (nameV,source,hour,min){

        var div =  document.createElement('div')
        var name = document.createElement('h5')
        var image= document.createElement('img')
        var time = document.createElement('span')


        time.innerHTML = "<br>" + hour + " : " + min 
        name.innerHTML = nameV
        image.src = source
        image.style.width = "150px";
        image.style.height = "200px";


        div.appendChild(name)
        div.appendChild(image)
        div.appendChild(time)

         return div
    }
    
}