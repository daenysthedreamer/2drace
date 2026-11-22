var gameArea = document.querySelector(".gameArea");
var finishLine = document.querySelector(".finishLine");
var driveInterval = null;
const playbtn = document.querySelector(".play");
const beallitasbtn = document.querySelector(".settings");
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
    requestAnimationFrame(movePlayer);
}

function collide(a, b) {
    const pad = 40;
    if ((a.right - pad - 20 < b.left + pad) || (a.left + pad + 20 > b.right - pad) || (a.bottom - pad - 20 < b.top + pad) || (a.top + pad + 20 > b.bottom - pad)) return false;
    return true;
}

var currentLaps = 0;
var lapLength = 8000;
var distance = 0;
var currentLeft = 0;
var lapsMezo = document.querySelector(".currentLaps");
var enemies = [];
var score = 0;
var scoreSpeed = 12;
var scoreMezo = document.querySelector(".score");

playbtn.addEventListener('click', () => {
    if (driveInterval == null) {
        driveInterval = setInterval(() => {
            if (speed < maxSpeed) {
                speed += acceleration;
            }
            currentLeft = parseFloat(gameArea.style.backgroundPositionX) || 0;
            gameArea.style.backgroundPositionX = (currentLeft - speed) + 'px';

            distance += speed;
            Entitasok.setRoadSpeed(speed);
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
                        x++;
                        if (x == 10) clearInterval(anim);
                    }, 50);
                }
            }

            if (speed >= maxSpeed * 0.3 + (maxSpeed - speed)) {
                score += 0.25;
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
            var enemySpeed = Math.random() * 4;
            var obj = new Entitasok(gameArea.offsetWidth, y, enemySpeed, ".gameArea");
            obj.move();
            enemies.push(obj);
        }, 290);
    }

    if (player == null) {
        player = new Auto(20, gameArea.offsetHeight / 2.5, 6, ".gameArea");
        movePlayer();
    }
});


const beallitasModal = new bootstrap.Modal('#exampleModal');
const sikerModal = new bootstrap.Modal('#successModal');
const mentesbtn = document.querySelector("#exampleModal .btn-primary");
const lapsInput = document.querySelector(".laps");
const speedInput = document.querySelector(".maxSpeed");
const lapLengthInput = document.querySelector(".lapLength");
const inputs = [lapsInput, speedInput, lapLengthInput];
let mentve = false;

beallitasbtn.addEventListener('click', () => {
    lapsInput.value = maxLaps;
    speedInput.value = maxSpeed;
    lapLengthInput.value = lapLength;
    inputs.forEach(input => input.classList.remove("is-invalid"));
    beallitasModal.show();
});

mentesbtn.addEventListener('click', () => {
    let ok = true;

    for (const input of inputs) {
        const value = Number(input.value);
        const valid = input.value === String(value) && Number.isInteger(value) && value >= input.min && value <= input.max;
        input.classList.toggle("is-invalid", !valid);
        if (!valid) ok = false;
    }
    if (!ok) return;

    maxLaps = Number(lapsInput.value);
    maxSpeed = Number(speedInput.value);
    lapLength = Number(lapLengthInput.value);
    speed = Math.min(speed, maxSpeed);
    document.querySelector(".max-laps").textContent = maxLaps;

    mentve = true;
    beallitasModal.hide();
});


document.querySelector("#exampleModal").addEventListener('hidden.bs.modal', () => {
    if (mentve) {
        mentve = false;
        sikerModal.show();
    }
});