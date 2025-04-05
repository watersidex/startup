/*-----------TOP-----------*/

let logdialog = document.querySelector(".dialog")
let butt = document.querySelector(".butt")
let can = document.querySelector(".can")

butt.onclick = () => {
    logdialog.style.display = "flex"
}

can.onclick = () => {
    logdialog.style.display = "none"
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
        if (element.innerText == "All") {
            workcards.forEach(workcard => workcard.style.display = "block")
        } else {
            workcards.forEach(workcard => {
                workcard.style.display = element.innerText == workcard.querySelector("p").innerText ? "block" : "none"
            })

        }

    }
})

/*-----------READ MORE-----------*/

let readmore = document.querySelectorAll(".readmore")
let txmore = document.querySelectorAll(".txmore")

readmore.forEach((element, index) => {
    element.onclick = (e) => {
        e.preventDefault()
        txmore[index].classList.toggle("txshow")
    }
})

/*-----------BURGER MENU-----------*/

let bur = document.querySelector(".burMenu")
//let open = bur.classList.toggle("burMenuOpen")

let menu = document.querySelector(".menu")

bur.onclick = () => {
    bur.classList.toggle("burMenuOpen")
    menu.classList.toggle("burblock")

    //open.style.backgroungImage: ""
}

