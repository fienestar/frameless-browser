(function(){
    try{
    if(!document.getElementById("location-input-style")) {
        let link = document.createElement("link")
        link.id = "location-input-style"
        link.rel = "stylesheet"
        link.type = "text/css"
        link.href = "local://assets/css/URLInput.css"
        document.head.appendChild(link)
    }
    let input = document.getElementById("location-input")
    if(!input) {
        input = document.createElement("input")
        input.id = "location-input"

        input.addEventListener("focusout", () => {
            input.style.display = "none"
        })

        input.addEventListener("keydown", (ev) => {
            if(ev.code == "Enter"){
                let url = input.value
                if(url.split('://').length == 1)
                    url = 'http://' + url
                window.location.href = url
            }
        })

        document.body.appendChild(input)
    }
    
    input.style.display = "block"
    input.focus()
}catch(e){console.error(e)}
})()