var gameArea = document.querySelector(".gameArea");
var finishLine = document.querySelector(".finishLine");
var driveInterval = null;
const playbtn = document.querySelector(".play")
const beallitasbtn = document.querySelector(".settings")
var gameInterval = null;
var player = null;
const keys = new Set();




var maxLaps = 3;
var minSpeed = 6;
var speed = minSpeed;
var acceleration = 0.015;
var maxSpeed = 20;

document.addEventListener("keydown", (e) => keys.add(e.key.toLowerCase()));
document.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));

function movePlayer() {
    if (player) {
        let dx = (keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0);
        let dy = (keys.has("s") ? 1 : 0) - (keys.has("w") ? 1 : 0);


        if (dx !== 0 || dy !== 0) player.move(dx, dy);
    }
    //ai
    requestAnimationFrame(movePlayer);
    //
}
//ai

function collide(a, b) {
    const pad = 40;
    if ((a.right - pad - 20 < b.left + pad) || (a.left + pad + 20 > b.right - pad) || (a.bottom - pad - 20 < b.top + pad) || (a.top + pad + 20 > b.bottom - pad)) return false;
    return true;
}
//

var currentLaps = 0;
var lapLength = 8000;
var distance = 0;
var currentLeft = 0;
var lapsMezo = document.querySelector(".currentLaps")
var enemies = [];
var score = 0;
var scoreSpeed = 12;
var scoreMezo = document.querySelector(".score");

playbtn.addEventListener('click', () => {
    if (driveInterval == null) {
        driveInterval = setInterval(() => {
            if (speed < maxSpeed) {
                speed += acceleration
            }
            currentLeft = parseFloat(gameArea.style.backgroundPositionX) || 0;
            gameArea.style.backgroundPositionX = (currentLeft - speed) + 'px';

            distance += speed;
            finishLine.style.left = ((currentLaps + 1) * lapLength - distance) + 'px';
            if (finishLine.getBoundingClientRect().left <= player.getRect().right) {
                currentLaps++;
                lapsMezo.innerHTML = currentLaps;
            }
            
            for (let i = enemies.length - 1; i >= 0; i--) {
                if (enemies[i].isRemoved()) {
                    enemies.splice(i, 1);
                } else if (collide(player.getRect(), enemies[i].getRect())) {
                    speed = minSpeed;
                    enemies[i].remove();
                    enemies.splice(i, 1);

                    var x = 0;
                    var anim = setInterval(() => {
                        document.querySelector(".player").classList.toggle('d-none', x % 2 == 0);
                        x++
                        if (x == 10) clearInterval(anim);
                    }, 50);
                }
            }

            if (speed >= maxSpeed * 0.3 + (maxSpeed - speed)) {
                score += 0.25
                scoreMezo.innerHTML = Math.floor(score);
            }


            if (currentLaps >= maxLaps) {
                clearInterval(driveInterval);
                clearInterval(gameInterval);
                alert("Nyertél!");
            }
        }, 16);
    }

    if (gameInterval == null) {
        gameInterval = setInterval(() => {
            var y = Math.random() * (gameArea.offsetHeight - 150);
            var speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
            var obj = new Entitasok(gameArea.offsetWidth, y, speed, ".gameArea");
            obj.move();
            enemies.push(obj);
        }, 290);
    }

    if (player == null) {
        player = new Auto(20, gameArea.offsetHeight / 2.5, 6, ".gameArea");
        movePlayer();
    }
})


const beallitasModal = new bootstrap.Modal('#exampleModal')
var lapsInput = document.querySelector(".laps");
var speedInput = document.querySelector(".maxSpeed");
var lapLengthInput = document.querySelector(".lapLength");

beallitasbtn.addEventListener('click', () => {
    lapsInput.value = maxLaps;
    speedInput.value = maxSpeed;
    lapLengthInput.value = lapLength;
    beallitasModal.show();
})