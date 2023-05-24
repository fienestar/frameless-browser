(function () {
    let draggable = document.createElement("div")
    draggable.id = "draggable-area"

    function show(flag = true) {
        if (flag)
            draggable.style.display = "block"
        else
            draggable.style.display = "none"
    }

    document.addEventListener("keydown", ev => {
        if (ev.key === "Control" || ev.key === "Meta")
            show()
    })

    document.addEventListener("keyup", ev => {
        if (ev.key === "Control" || ev.key === "Meta")
            show(false)
    })

    window.addEventListener("blur", () => {
        show(false)
    })

    document.body.prepend(draggable)
})()