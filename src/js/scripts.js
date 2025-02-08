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

dropzone.ondragover = () => {
    //alert('u log')
    dropzone.style.backgroundColor = "red"
    //logswitch.style.top = "2px"
    dropzone.appendChild (logswitch)
}

/*-----------VALIDATOR-----------*/

let phonenum = document.querySelector("#phonenum")

phonenum.oninput = () => {
    phonenum.value = phonenum.value.replace(/[\D]/g,'')
}

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

readmore.forEach((element,index) => {
    element.onclick = (e) => {
        e.preventDefault()
        txmore[index].classList.toggle("txshow")
    }
})
