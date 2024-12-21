let btn = document.querySelector("#appload")
let inputs = document.querySelectorAll("input")
let tx = document.querySelector(".txarea")
inputs.forEach(input => {
    if (localStorage.getItem(input.name)) {
        input.value = localStorage.getItem(input.name)
    }

})

btn.onclick = (event) => {
    event.preventDefault()
    let newter = document.createElement('div')
    newter.classList.add('dialog')
    newter.style.display = 'block'
    document.body.appendChild(newter)
    let newdialog = document.createElement('form')
    newdialog.classList.add('dialogbox')
    newter.appendChild(newdialog)
    newdialog.innerHTML = '<h3>Check your data</h3>'
    inputs.forEach(input => {
        if (input.name) {
            localStorage.setItem(input.name, input.value)
            let newp = document.createElement ('p')
            newp.innerHTML = `${input.name} <em> ${input.value} </em>`
            newdialog.appendChild(newp)
        }
    })

    let newtx = document.createElement ('p')
    newtx.innerHTML = `${tx.name} <em> ${tx.value} </em>`
    newdialog.appendChild(newtx)
    newter.onclick = (event) => {
        newter.style.display = 'none'
        newter.remove ()
        event.cancelBubble = true
    }

    newdialog.onclick = (event) => {
        event.cancelBubble = true
    }

    let mbutt = document.createElement('div')
    mbutt.classList.add('mButt')
    newdialog.appendChild(mbutt)

    let conf = document.createElement('a')
    conf.classList.add('cor')
    mbutt.appendChild(conf)
    conf.innerText = 'confirm'
    
    let canc = document.createElement('a')
    canc.classList.add('can')
    mbutt.appendChild(canc)
    canc.innerText = 'cancel'

    canc.onclick = () => {
        newter.style.display = "none"
        newter.remove ()
    }
}