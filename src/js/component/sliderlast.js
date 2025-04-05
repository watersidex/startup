const quotes = [{
        quote: "In three words I can sum up everything I've learned about life: it goes on.",
        author: "Robert Frost"
    },
    {
        quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        author: "Ralph Waldo Emerson"
    },
    {
        quote: "Success is not the key to happiness. Happiness is the key to success.",
        author: "Albert Schweitzer"
    },
    {
        quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        author: "Ralph Waldo Emerson"
    },
    {
        quote: "It is never too late to be what you might have been.",
        author: "George Eliot"
    },
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        quote: "Happiness depends upon ourselves.",
        author: "Aristotle"
    },
    {
        quote: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        quote: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    }
];





class Slider {
    constructor(slidecont, slideSelector) {
        this.slidecont = slidecont
        this.slidecont.style.position = "relative"
        this.slideSelector = slideSelector
        this.slides = this.slidecont.querySelectorAll(slideSelector)
        this.slidecont.style.height = this.slidecont.getBoundingClientRect().height + "px"
        this.sliderwidth = this.slidecont.getBoundingClientRect().width
        this.slideWidth = this.slides[0].getBoundingClientRect().width
        this.slides.forEach(e => {
            e.style.position = "absolute"
        });
        this.maxVisibleSlides = 4
        this.place()
        this.move()
    }

    trigger() {
        console.log("trigger")
    }

    place() {
        this.carddist = this.sliderwidth - this.slideWidth * this.maxVisibleSlides
        console.log(this.carddist / (this.maxVisibleSlides - 1))
        console.log(this.slideWidth)
        this.slides.forEach((e, index) => {

            e.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * index + "px"

        });
    }

    move() {
        this.slidertimer = setInterval(() => {
            let phantomsl = this.slides[0].cloneNode(true)
            phantomsl.style.left = (this.slideWidth + this.carddist / this.maxVisibleSlides) * this.slides.length + (this.carddist /( this.maxVisibleSlides - 1)) + "px"
            this.slidecont.appendChild(phantomsl)
            this.slides.forEach((e, index) => {
                e.style.left = (e.getBoundingClientRect().width + this.carddist / (this.maxVisibleSlides - 1)) * (index - 1) + "px"
            });

            this.trigger()

            phantomsl.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (this.slides.length - 1) + "px"
            setTimeout(() => {
                this.slides[0].remove()
                this.slides = this.slidecont.querySelectorAll(this.slideSelector)

            }, 2000)
        }, 5000)
    }
}

class EmpSlider extends Slider {
    constructor(slidecont) {
        super(slidecont, ".divsl")
    }

    clickProtector = false

    move3L = () => {
        clearInterval(this.slidertimer)
        let arrayphantom = [this.slides[0].cloneNode(true), this.slides[1].cloneNode(true), this.slides[2].cloneNode(true)]

        arrayphantom.forEach((element, index) => {
            element.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (this.slides.length + index ) + "px"
            element.classList.add("phantom")
            slidecont.appendChild(element)
            setTimeout(() => {                
                element.style.left = (this.slideWidth+ this.carddist / (this.maxVisibleSlides - 1)) * (index + 2) + "px"
            }, 10);
        });
        this.slides.forEach((e, index) => {
            setTimeout(() => {  
                e.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (index - 3) + "px"
            }, 10);
        });
        setTimeout(() => {
            this.slides[0].remove()
            this.slides[1].remove()
            this.slides[2].remove()
            this.slides = this.slidecont.querySelectorAll(this.slideSelector)
            this.clickProtector = false
            this.move()
        }, 2000)
    }

    move3R = () => {
        clearInterval(this.slidertimer)
        let arrayphantom = [this.slides[this.slides.length - 1].cloneNode(true), this.slides[this.slides.length - 2].cloneNode(true), this.slides[this.slides.length - 3].cloneNode(true)]
        arrayphantom.forEach((element, index) => {
            element.style.left = -(this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (index + 1) + "px"
            slidecont.insertAdjacentElement("afterbegin", element)
            setTimeout(() => {                
                element.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (2 - index) + "px"
            }, 10);
        });
        this.slides.forEach((e, index) => {
            setTimeout(() => {                
                e.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (index + 3) + "px"
            }, 10);
        });
        setTimeout(() => {
            this.slides[this.slides.length - 3].remove()
            this.slides[this.slides.length - 2].remove()
            this.slides[this.slides.length - 1].remove()
            this.slides = this.slidecont.querySelectorAll(this.slideSelector)
            this.clickProtector = false
            this.move()
        }, 2000)
    }
    setbuttons = (buttonL, buttonR) => {
        buttonL.onclick = () => {
            if (this.clickProtector == false) {
                this.clickProtector = true
                this.move3L()
            }
        }
        buttonR.onclick = () => {
            if (this.clickProtector == false) {
                this.clickProtector = true
                this.move3R()
            }
        }
    }
}


/*-----------QUOTES-----------*/


class Quotes extends Slider {
    constructor(slidecont, quotes) {
        super(slidecont, "img")
        this.quotes = quotes
        this.activeQuote = 0

        clearInterval(this.slidertimer)
        this.maxVisibleSlides = 5
        this.place()
        this.move()

    }
    setDots(DotCont) {
        let dots = document.querySelectorAll(DotCont + " .dot")
        dots.forEach(dot => dot.classList.remove("active"))
        this.dots = dots
        this.DotCont = DotCont
        this.activeDot = 0
        dots[0].classList.add("active")
    }
    trigger() {
        this.dots[this.activeDot].classList.remove("active")
        if (this.activeDot < this.dots.length - 1) {
            this.activeDot++
        } else {
            this.activeDot = 0
        }
        this.dots[this.activeDot].classList.add("active")
        // document.querySelector(this.DotCont).appendChild(document.querySelector(this.DotCont + ".dot"))
        if (this.activeQuote < this.quotes.length - 1) {
            this.activeQuote++
        } else {
            this.activeQuote = 0
        }
        //this.quotesl.innerHTML = (this.quotes[this.activeQuote].quote)
        //this.authorsl.innerHTML = (this.quotes[this.activeQuote].author)
        this.quotesl.style.opacity = "0"
        this.authorsl.style.opacity = "0"
        setTimeout(() => {
            this.quotesl.innerHTML = (this.quotes[this.activeQuote].quote)
            this.authorsl.innerHTML = (this.quotes[this.activeQuote].author)
            this.quotesl.style.opacity = "1"
            this.authorsl.style.opacity = "1"
        }, 2000)
    }

    setQuotes(QuotesCont) {
        this.quotesl = document.querySelector(QuotesCont + " .slide")
        this.authorsl = document.querySelector(QuotesCont + " .john")

    }
}

let slidecont = document.querySelector(".sl")
let emp = new EmpSlider(slidecont)
console.log(emp)

let butL = document.querySelector(".arrowl")
let butR = document.querySelector(".arrowr")
emp.setbuttons(butL, butR)

let slideqcont = document.querySelector(".logosliders")
let qslide = new Quotes(slideqcont, quotes)
qslide.setDots(".dots")
qslide.setQuotes(".bottomslide")