export class Bubble {
    constructor (nameValue,txtValue,bc,hour,min){
        var div = document.createElement('div')
        var name = document.createElement('h5')
        var txt =  document.createElement('p')
        var time = document.createElement('span')


         time.innerHTML = hour + " : " + min 
         name.innerHTML = nameValue 
         txt.innerHTML = txtValue

         div.style.wordWrap = 'break-word'
         div.style.overflowWrap = 'break-word'
         div.style.backgroundColor = bc
         div.style.width = "100%"
         time.style.fontSize = '10px'
         div.style.borderRadius ='8px'
         div.style.color = "black"


         div.appendChild(name)
         div.appendChild(txt)
         div.appendChild(time)

         return div
    }
    
}

