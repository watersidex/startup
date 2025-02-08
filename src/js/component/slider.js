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
    constructor(slidecont) {
        this.slidecont = slidecont
        this.slidecont.style.position = "relative"
        this.slides = this.slidecont.querySelectorAll(".divsl")
        this.slidecont.style.height = this.slidecont.getBoundingClientRect().height + "px"
        this.sliderwidth = this.slidecont.getBoundingClientRect().width
        this.slides.forEach(e => {
            e.style.position = "absolute"
        });
        this.place()
        this.move()
    }
    place() {
        this.carddist = this.sliderwidth - this.slides[0].getBoundingClientRect().width * 4 
        console.log(getComputedStyle(this.slides[0]).width)
        console.log(this.slides[0].getBoundingClientRect().width)
        this.slides.forEach((e, index) => {
            e.style.left = 45 + (e.getBoundingClientRect().width + this.carddist / 3) * index + "px"

        });
    }

    move() {
        setInterval(() => {
            let phantomsl = this.slides[0].cloneNode(true)
            phantomsl.style.left = (this.slides[0].getBoundingClientRect().width + this.carddist / 4) * 5 + "px"
            slidecont.appendChild(phantomsl)
            this.slides.forEach((e, index) => {
                e.style.left = 45 + (e.getBoundingClientRect().width + this.carddist / 4) * (index - 1) + "px"

            });
            phantomsl.style.left = (phantomsl.getBoundingClientRect().width + this.carddist / 4) * 4 + "px"
            setTimeout(() => {
                this.slides[0].remove()
                this.slides = this.slidecont.querySelectorAll(".divsl")

            }, 2000)
        }, 5000)
    }
}

class EmpSlider extends Slider {
    constructor(slidecont) {
        super(slidecont)
    }
}

class Quotes extends Slider {

}

let slidecont = document.querySelector(".sl")
let emp = new EmpSlider(slidecont)
console.log(emp)