/*-----------TOP-----------*/

let dialog = document.querySelector(".dialog")
let butt = document.querySelector(".butt")
let can = document.querySelector(".can")

butt.onclick = () => {
    dialog.style.display = "flex"
}

can.onclick = () => {
    dialog.style.display = "none"
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