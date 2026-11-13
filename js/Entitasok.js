class Entitasok{
    #x;
    #y;
    #speed;
    #container;
    #element;
    #pont;

    constructor(x, y, speed, container){
        this.setX(x);
        this.setY(y);
        this.setSpeed(speed);
        this.setContainer(container)
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
}