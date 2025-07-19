/*-----------TOP-----------*/

let logdialog = document.querySelector(".dialog")
let butt = document.querySelector(".butt")
let can = document.querySelector(".can")

butt.onclick = (event) => {
    logdialog.style.display = "flex"
    event.preventDefault()
}

can.onclick = (event) => {
    logdialog.style.display = "none"
    event.preventDefault()
}

/*-----------DIALOGBOX-----------*/

let logswitch = document.querySelector(".logswitch strong")
let dropzone = document.querySelector(".dropzone")
let diinputs = document.querySelectorAll(".dialogbox input[type='text']")

dropzone.ondragover = () => {
    //alert('u log')
    dropzone.parentElement.style.backgroundColor = "#7b241c"
    logswitch.style.top = "2px"
    logswitch.style.backgroundColor = "white"
    dropzone.appendChild(logswitch)
}

let movetouch = 0

let touchendX = 0

logswitch.ontouchstart = (touches) => {
    movetouch = touches.touches[0].pageX
}

logswitch.ontouchend = (touches) => {
    if ((touchendX - movetouch >= logswitch.parentElement.getBoundingClientRect().width - 50) && (touchendX - movetouch <= logswitch.parentElement.getBoundingClientRect().width - 30)) {
        dropzone.parentElement.style.backgroundColor = "#7b241c"
        logswitch.style.top = "2px"
        logswitch.style.backgroundColor = "white"
        dropzone.appendChild(logswitch)
        logswitch.style.left = "0px" 
        logswitch.ontouchmove = null
        logswitch.ontouchend = null
        logswitch.ontouchstart = null
    } else {
        logswitch.style.left = "5px"
    }
}

logswitch.ontouchmove = (touches) => {
    console.log(touches.touches[0].pageX)
    if (touches.touches[0].pageX - movetouch >= 5 && touches.touches[0].pageX - movetouch <= logswitch.parentElement.getBoundingClientRect().width - 30) {
        logswitch.style.left = touches.touches[0].pageX - movetouch + "px"
        touchendX = touches.touches[0].pageX
    }
}


let cor = document.querySelector(".cor")
let welcome = document.querySelector(".welcome")
cor.onclick = (event) => {
    event.preventDefault()
    let subwaykeys = 0
    diinputs.forEach(element => {
        if (element.value.length > 15 && element.value.length < 3) {
            element.focus()
            element.style.borderColor = "red"
            subwaykeys = 0
            return
        } else {
            element.style.borderColor = "grey"
            subwaykeys += 1
        }
    });

    if (logswitch.style.backgroundColor == "white") {
        subwaykeys += 1
    }

    if (subwaykeys == 4) {
        logdialog.style.display = "none"
        welcome.innerText = "welcome " + diinputs[0].value + " " + diinputs[1].value + "!)"
        alert("u log in")
    }
}

/*-----------VALIDATOR-----------*/

let phonenum = document.querySelector("#phonenum")
let lastname = document.querySelector("#lastname")
let firstname = document.querySelector("#firstname")

phonenum.oninput = () => {
    phonenum.value = phonenum.value.replace(/[\D]/g, '')
}

/*lastname.onkeyup = function () {
    lastname.value = lastname.value.replace(/[^A-Za-z А-Яа-яЄЇІєії]/g, "")
}

firstname.onkeyup = function () {
    firstname.value = firstname.value.replace(/[^A-Za-z А-Яа-яЄЇІєії]/g, "")
}*/

let validinp = [lastname, firstname]

validinp.forEach(element => {
    element.onkeyup = function () {
        element.value = element.value.replace(/[^A-Za-z А-Яа-яЄЇІєії]/g, "")
    }

});

/*-----------SERVICES-----------*/

let cardsoff = document.querySelectorAll(".cardoff img")
cardsoff.forEach(cardoff => {
    cardoff.onclick = (event) => {
        if (event.detail == 3) {
            cardoff.previousElementSibling.style.color = "#c0301c"
            cardoff.previousElementSibling.style.fontWeight = "bold"
            cardoff.previousElementSibling.innerText = "discover"
        }
    }
})

/*-----------LATEST WORKS-----------*/

let ltmenu = document.querySelectorAll(".ltmenu a")
let workcards = document.querySelectorAll(".workcard")

ltmenu.forEach(element => {
    element.onclick = (e) => {
        e.preventDefault()
        showltw(element.innerText)
        localStorage.setItem("headerltw", element.innerText)

    }
})

let showltw = (choice) => {
    if (choice == "All") {
        workcards.forEach(workcard => workcard.style.display = "block")
    } else {
        workcards.forEach(workcard => {
            workcard.style.display = choice == workcard.querySelector("p").innerText ? "block" : "none"
        })

    }
}

if (localStorage.getItem("headerltw")) {
    let headerltw = localStorage.getItem("headerltw")
    showltw(headerltw)
}

/*-----------READ MORE-----------*/

let readmore = document.querySelectorAll(".readmore")
let txmore = document.querySelectorAll(".txmore")
let close = document.querySelectorAll(".close")

readmore.forEach((element, index) => {
    element.onclick = (e) => {
        e.preventDefault()
        txmore[index].classList.toggle("txshow")
        /*close.style.display = "block"*/
        element.innerText = (element.innerText.toLowerCase() == 'close the text') ? 'read more' : 'close the text'
        return
    }
})

/*-----------BURGER MENU-----------*/

let bur = document.querySelector(".burMenu")
//let open = bur.classList.toggle("burMenuOpen")

let menu = document.querySelector(".menu")
let blur = document.querySelector(".blur")

bur.onclick = () => {
    bur.classList.toggle("burMenuOpen")
    document.body.style.overflow = (bur.classList.contains("burMenuOpen")) ? "hidden" : "auto"
    menu.classList.toggle("burblock")
    //open.style.backgroungImage: ""\
}

menu.onclick = () => {
    document.body.style.overflow = "auto"
    bur.classList.remove("burMenuOpen")
    menu.classList.remove("burblock")
}