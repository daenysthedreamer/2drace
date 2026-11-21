class Entitasok{
    #x;
    #y;
    #speed;
    #container;
    #element;
    #type
    #moveInterval
    static #pont;

    constructor(x, y, speed, container){
        this.setX(x);
        this.setY(y);
        this.setSpeed(speed);
        this.setContainer(container)
        this.createElement();
    }

    setX(x){
        this.#x = x;
    }

    setY(y){
        this.#y = y;
    }

    setSpeed(speed){
        this.#speed = speed;
    }

    setContainer(container){
        this.#container = document.querySelector(container);
    }


    createElement() {
        this.#element = document.createElement("div");
        this.#element.style.left = this.#x + "px";
        this.#element.style.top = this.#y + "px";
        this.#type = Math.random() < 0.5;
        this.#element.classList.add("entitas");
        this.#container.appendChild(this.#element);
        this.#element.addEventListener("click", () => this.collect());
    }


 move() {
        this.#moveInterval = setInterval(() => {

            if(this.#element.parentNode == null){
                this.remove();
                return;
            }

            this.#x -= this.#speed;
            this.#element.style.left = this.#x + "px";
            if (this.#x < -50) {
                this.remove();
            }
        }, 20);
    }


     remove() {
        this.#element.remove();
        clearInterval(this.#moveInterval);
        this.#moveInterval = null;
    }
//ai
    getRect() {
    return this.#element.getBoundingClientRect();
}

isRemoved() {
    return !this.#element.isConnected;
}
//
}