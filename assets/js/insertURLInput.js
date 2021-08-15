(function () {
    input = document.createElement("input")
    input.id = "location-input"

    input.addEventListener("focusout", () => {
        input.style.display = "none"
    })

    input.addEventListener("keydown", (ev) => {
        if (ev.code == "Enter") {
            let url = input.value
            if (url.split('://').length == 1)
                url = 'http://' + url
            window.location.href = url
        }
    })

    document.body.prepend(input)
})()