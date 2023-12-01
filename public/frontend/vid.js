export class Vid {
    constructor (nameV,source,bool,hour,min){
        var div =  document.createElement( 'div')
        var name = document.createElement('h5')
        var vid = document.createElement('video')
        name.innerHTML = nameV
        var time = document.createElement('span')
        time.innerHTML = "<br>" + hour + " : " + min 
        vid.style.width = "150px";
        vid.style.height = "200px";
        vid.controls = true
        
        var sourc = document.createElement('source');
        if(bool)  {
       sourc.src = URL.createObjectURL(new Blob([source], { type: 'video/mp4' }));
        } else {
       sourc.src = source
        }
        sourc.type = 'video/mp4';
        vid.appendChild(sourc)

        div.appendChild(name)
        div.appendChild(vid)
        div.appendChild(time)

         return div
    }
    
}