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

//Entitasok.js egységteszt (Kiss)
var enemy = new Entitasok(30, 40, 3, 'section');
var enemyElement = document.querySelector('.entitas')
console.assert(enemy.toString() === "{30;40;3;0}", "Hiba a konstruktor adatbeállításaiban!")
Entitasok.setRoadSpeed(2);
console.assert(enemy.toString() === "{30;40;3;2}", "Hiba a setRoadSpeed() statikus metódusban!")
console.assert(enemyElement.style.left === "30px", "Hiba a createElement() metódusban!")

var torles = new Entitasok(20, 20, 20, 'section')
console.assert(!torles.isRemoved(), "Hiba az isRemoved() függvényben, mert létező elemre igazat ad!")
torles.remove();
console.assert(torles.isRemoved(), "Hiba a remove() függvényben mert törölt elemre hamist ad!")
console.assert(gameArea.children.length === 1, "Hiba a remove() függvényben, mert az elem nem törlődik az oldalon!")

