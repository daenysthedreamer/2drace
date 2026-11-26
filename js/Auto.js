class Auto {
    #x;
    #y;
    #speed;
    #container;
    #element;

    constructor(x, y, speed, container) {
        this.setX(x);
        this.setY(y);
        this.setSpeed(speed);
        this.setContainer(container);

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

    createElement() {
        this.#element = document.createElement('div');
        this.#element.classList.add('player');
        this.#element.style.left = this.#x + "px";
        this.#element.style.top = this.#y + "px";
        this.#container.appendChild(this.#element);
    }

    move(dx, dy) {
        this.#x += dx * this.#speed;
        this.#y += dy * this.#speed;

        if (this.#x < 0) this.#x = 0;
        if (this.#y < 0) this.#y = 0;
        if (this.#x > this.#container.clientWidth - 120) this.#x = this.#container.clientWidth - 120;
        if (this.#y > this.#container.clientHeight - 100) this.#y = this.#container.clientHeight - 100;

        this.#element.style.left = this.#x + "px";
        this.#element.style.top = this.#y + "px";
    }
//ai
    getRect() {
        return this.#element.getBoundingClientRect();
    }
    //
    toString(){
    return `{${this.#x};${this.#y};${this.#speed}}`
}
}