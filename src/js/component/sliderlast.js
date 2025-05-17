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
        this.slidecont = slidecont // Контейнер з карточками
        this.slidecont.style.position = "relative"
        this.slideSelector = slideSelector // Назва CSS - класу однієї карточки 
        this.slides = this.slidecont.querySelectorAll(slideSelector)
        this.slidecont.style.height = this.slidecont.getBoundingClientRect().height + "px" // фіксуємо жорстко висоту слайдера 
        this.sliderwidth = this.slidecont.getBoundingClientRect().width // ширина контейнера слайдера
        this.slideWidth = this.slides[0].getBoundingClientRect().width // ширина карточки слайду
        this.slides.forEach(e => {
            e.style.position = "absolute"
        });
        this.fixedCardDist = 100
        this.defaultVisibleSlides = 4 // Кількість слайдів які будуть показуватись фіксоване значення
        //this.maxVisibleSlides = Math.floor(this.slidecont.getBoundingClientRect().width / this.slideWidth) // Відповідно ширини визначаємо кількість видимих слайдів
        //if (this.maxVisibleSlides == 0) this.maxVisibleSlides = 1 // При мінімумі зажди буде 1 слайд
        //if (this.maxVisibleSlides > this.defaultVisibleSlides) this.maxVisibleSlides = this.defaultVisibleSlides // При максимумі зажди буде значення за замовчуванням
        this.getCardCount()
        this.place()
        this.move()
    }

    getCardCount() {
        this.maxVisibleSlides = Math.floor(this.slidecont.getBoundingClientRect().width / this.slideWidth) // Відповідно ширини визначаємо кількість видимих слайдів
        if (this.maxVisibleSlides == 0) this.maxVisibleSlides = 1 // При мінімумі зажди буде 1 слайд
        if (this.maxVisibleSlides > this.defaultVisibleSlides) this.maxVisibleSlides = this.defaultVisibleSlides // При максимумі зажди буде значення за замовчуванням
    }

    trigger() {
        console.log("trigger")
    }

    slideResize() {
        clearInterval(this.slidertimer) // Вимкнути перемикання слайдеру
        //this.maxVisibleSlides = Math.floor(this.slidecont.getBoundingClientRect().width / this.slideWidth) // Відповідно ширини визначаємо кількість видимих слайдів
        //if (this.maxVisibleSlides == 0) this.maxVisibleSlides = 1 // При мінімумі зажди буде 1 слайд
        //if (this.maxVisibleSlides > this.defaultVisibleSlides) this.maxVisibleSlides = this.defaultVisibleSlides // При максимумі зажди буде значення за замовчуванням
        this.getCardCount()
        this.sliderwidth = this.slidecont.getBoundingClientRect().width // перевизначаємо спільну ширину слайдера

        this.place() // робимо розстановку
        this.move()
        console.log(this.maxVisibleSlides)
    }

    place() {
        if (this.maxVisibleSlides > 1) { // Якщо більше однієї карточки, то йде розташування за цим принципом 
            this.carddist = this.sliderwidth - this.slideWidth * this.maxVisibleSlides // розрахунок відступів між карточками
            //console.log(this.carddist / (this.maxVisibleSlides - 1))
            //console.log(this.slideWidth)
            let x = document.querySelector(".service-message")
            x.innerHTML = "<b>sliderwidth: </b>" + this.sliderwidth
            this.slides.forEach((e, index) => {
                // функція розташування карточок коли 2 і більше
                e.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * index + "px"
                e.style.width = this.slideWidth + "px"
            });
        } else {
            this.slides.forEach((e, index) => {

                // функція розташування карточок коли одна карточка
                e.style.left = (this.sliderwidth + this.fixedCardDist) * index + "px"
                e.style.width = window.innerWidth - 15 + "px"
            });

        }

    }

    move() { //зміна розташування карточок, кожні 5 секунд
        this.slidertimer = setInterval(() => {
            this.moveL()
        }, 5000)
    }

    moveL() {
        //створюємо фантом слайд,, визначаємо його розташування
        let phantomsl = this.slides[0].cloneNode(true)
        if (this.maxVisibleSlides > 1) {
            phantomsl.style.left = (this.slideWidth + this.carddist / this.maxVisibleSlides) * this.slides.length + (this.carddist / (this.maxVisibleSlides - 1)) + "px"
        } else {
            phantomsl.style.left = (this.slideWidth + this.fixedCardDist) * this.slides.length + this.fixedCardDist + "px"
        }
        this.slidecont.appendChild(phantomsl)
        //розміщення карточок в слайді (зсув)
        this.slides.forEach((e, index) => {
            if (this.maxVisibleSlides > 1) {
                e.style.left = (e.getBoundingClientRect().width + this.carddist / (this.maxVisibleSlides - 1)) * (index - 1) + "px"
            } else {
                e.style.left = (e.getBoundingClientRect().width + this.fixedCardDist) * (index - 1) + "px"
            }
        });

        this.trigger() // при потребі викликаємо трігер

        // зміщення фантом слайду
        if (this.maxVisibleSlides > 1) {
            phantomsl.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (this.slides.length - 1) + "px"
        } else {
            phantomsl.style.left = (this.slideWidth + this.fixedCardDist) * (this.slides.length - 1) + "px"
        }

        setTimeout(() => { //прибираємо інші слайди з поза зони видимості
            this.slides[0].remove()
            this.slides = this.slidecont.querySelectorAll(this.slideSelector)

        }, 2000)
    }
}

class EmpSlider extends Slider {
    constructor(slidecont) {
        super(slidecont, ".divsl")
        slidecont.addEventListener("touchstart", this.touchslStart);
        slidecont.addEventListener("touchend", this.touchslEnd);
        slidecont.addEventListener("touchmove", this.touchslMove);
    }

    touchslStart = (event) => {
        //console.log("start")
        //console.dir(event.touches[0].pageX)
        this.startX = event.touches[0].pageX
    }

    touchslEnd = (event) => {
        console.log("end")
        if (this.moveX - this.startX > 50 || this.moveX - this.startX < -50) {
            if (this.clickProtector == false) {
                this.clickProtector = true
                if (this.moveX < this.startX) {
                    console.log("touchL")
                    clearInterval(this.slidertimer)
                    this.move3L()
                } else {
                    console.log("touchR")
                    clearInterval(this.slidertimer)
                    this.move3R()
                }
            }
        }
    }

    touchslMove = (event) => {
        //console.log("move")
        //console.dir(event.touches[0].pageX)
        this.moveX = event.touches[0].pageX
    }

    // захист від повторних кліків по кнопкам (L/R)
    clickProtector = false

    // зсув (на 3 слайди) в ліву сторону, при натисканні на кнопку
    move3L = () => {
        clearInterval(this.slidertimer)

        // створення масиву фантомів, 3
        let arrayphantom = [this.slides[0].cloneNode(true), this.slides[1].cloneNode(true), this.slides[2].cloneNode(true)]

        // розташування фантом слайдів
        arrayphantom.forEach((element, index) => {
            if (this.maxVisibleSlides > 1) {
                element.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (this.slides.length + index) + "px"
            } else {
                element.style.left = (this.slideWidth + this.fixedCardDist) * (this.slides.length + index) + "px"
            }
            element.classList.add("phantom")
            slidecont.appendChild(element)

            // зсув фантомів
            setTimeout(() => {
                if (this.maxVisibleSlides > 1) {
                    element.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (index + 2) + "px"
                } else {
                    element.style.left = (this.slideWidth + this.fixedCardDist) * (index + 2) + "px"
                }
            }, 10);
        });

        // зсув видимих слайдів
        this.slides.forEach((e, index) => {
            setTimeout(() => {
                if (this.maxVisibleSlides > 1) {
                    e.style.left = (this.slideWidth + this.carddist / (this.maxVisibleSlides - 1)) * (index - 3) + "px"
                } else {
                    e.style.left = (this.slideWidth + this.fixedCardDist) * (index - 3) + "px"
                }
            }, 10);
        });

        // ремув слайдів за зоною видимості
        setTimeout(() => {
            this.slides[0].remove()
            this.slides[1].remove()
            this.slides[2].remove()
            this.slides = this.slidecont.querySelectorAll(this.slideSelector)
            this.clickProtector = false
            this.move()
        }, 2000)
    }


    // сейм зміщення на 3 слайди, але в праву сторону
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

    move1L = () => {
        clearInterval(this.slidertimer)
        this.moveL()


        setTimeout(() => {
            this.clickProtector = false
            this.move()
        }, 2000)
    }


    move1R = () => {
        clearInterval(this.slidertimer)
        let phantom = this.slides[this.slides.length - 1].cloneNode(true)
        phantom.style.left = -(this.slideWidth + this.fixedCardDist) + "px"
        slidecont.insertAdjacentElement("afterbegin", phantom)
        setTimeout(() => {
            phantom.style.left = "0px"
        }, 50);
        this.slides.forEach((e, index) => {
            setTimeout(() => {
                e.style.left = (this.slideWidth + this.fixedCardDist) * (index + 1) + "px"
            }, 50);
        });
        setTimeout(() => {
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
                if (this.maxVisibleSlides > 2) {
                    this.move3L()
                } else {
                    this.move1L()
                }
            }
        }
        buttonR.onclick = () => {
            if (this.clickProtector == false) {
                this.clickProtector = true
                if (this.maxVisibleSlides > 2) {
                    this.move3R()
                } else {
                    this.move1R()
                }
            }
        }
    }
}


/*-----------QUOTES-----------*/


class Quotes extends Slider {
    constructor(slidecont, quotes) {
        super(slidecont, ".logobx")
        this.quotes = quotes
        this.activeQuote = 0

        clearInterval(this.slidertimer)
        this.defaultVisibleSlides = 5
        this.getCardCount()
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
        this.dots.forEach(
            (dot, index) => {
                dot.onclick = () => {
                    //console.log('switch quote')
                    clearInterval(this.slidertimer)
                    this.quotesl.style.opacity = "0"
                    this.authorsl.style.opacity = "0"
                    this.dots[this.activeDot].classList.remove("active")
                    setTimeout(() => {
                        this.quotesl.innerHTML = (this.quotes[index].quote)
                        this.authorsl.innerHTML = (this.quotes[index].author)
                        this.quotesl.style.opacity = "1"
                        this.authorsl.style.opacity = "1"
                        this.activeDot = index
                        dots[index].classList.add("active")
                        this.move()
                    }, 500)

                }
            }
        )
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


window.onresize = () => {
    emp.slideResize()
    qslide.slideResize()
}