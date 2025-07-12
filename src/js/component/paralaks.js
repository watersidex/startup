/*-----------TOP & MAIN-----------*/ 

let topp = document.querySelector('.top')
let mainn = document.querySelector('.mainbanner')
let paralaks = [topp, mainn]

paralaks.forEach(element => {
    element.onmousemove = (event) => {
        let shiftX = event.x * 100 / window.innerWidth
        let shiftY = event.y * 100 / window.innerHeight
        element.style.backgroundPosition = shiftX + '% ' + shiftY + '%'
    }
}); 