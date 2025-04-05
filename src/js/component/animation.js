let scrollobj = ['#services', '#about', '#works', '#blog', '#clients', '#contact', '#footer']
let scrollobjY = []
let myobj = []
window.onload = () => {

    scrollobj.forEach(e => myobj.push(document.querySelector(e)))
    myobj.forEach(e => {
        scrollobjY.push(e.getBoundingClientRect().top + window.scrollY)
        e.style.opacity = '0'
        e.style.transition = '1s all ease'
        if (e.firstElementChild) {
            e.firstElementChild.style.transition = '3s all ease'
            e.firstElementChild.style.transform = 'translateX (-90px)'
        }
    })
    console.log(scrollobjY)
}

window.onscroll = () => {
    //   if (window.scrollY > 500) {
    //     document.querySelector('#services').style.opacity = '1'
    //}
    scrollobjY.forEach((element, index) => {
        if (window.scrollY > element - window.innerHeight / 1) {
            myobj[index].style.opacity = '1'
            myobj[index].firstElementChild.style.transform = 'translateX (0px)'
        }
    })
}