class Entitasok {
    #x;
    #y;
    #speed;
    #container;
    #element;
    #type
    #moveInterval
    static #roadSpeed = 0;

    constructor(x, y, speed, container) {
        this.setX(x);
        this.setY(y);
        this.setSpeed(speed);
        this.setContainer(container)
        this.createElement();
    }

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }

    setSpeed(speed) {
        this.#speed = speed;
    }

    setContainer(container) {
        this.#container = document.querySelector(container);
    }


    static setRoadSpeed(value) {
        Entitasok.#roadSpeed = value;
    }

    createElement() {
        this.#element = document.createElement("div");
        this.#element.style.left = this.#x + "px";
        this.#element.style.top = this.#y + "px";
        this.#element.classList.add("entitas");
        this.#type = Math.floor(1 + Math.random() * 6);
        this.#element.classList.add(`auto${this.#type}`)


        this.#container.appendChild(this.#element);
    }


    move() {
        this.#moveInterval = setInterval(() => {

            if (this.#element.parentNode == null) {
                this.remove();
                return;
            }

            this.#x -= this.#speed + Entitasok.#roadSpeed;
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

    toString() {
        return `{${this.#x};${this.#y};${this.#speed};${Entitasok.#roadSpeed}}`
    }
}