var gameArea = document.querySelector(".gameArea");

//Auto.js egységteszt(Kincses)
var auto = new Auto(10, 20, 5, '.gameArea');
var autoElement = document.querySelector('.player');
console.assert(auto.toString() === "{10;20;5}", "Hiba a konstruktorban")
console.assert(autoElement.style.left === "10px", "Hiba a createElement metódusban")

auto.move(1, 1);
console.assert(auto.toString() === "{15;25;5}", "Hiba a move() metódusban, mert nem a sebességet használja")
auto.setY(-60)
auto.move(-1, -1);
console.assert(auto.toString() === "{5;0;5}", "Hiba a move() metódusban, mert a pálya felé tud menni!")