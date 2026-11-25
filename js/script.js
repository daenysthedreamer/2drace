var gameArea = document.querySelector(".gameArea");
var finishLine = document.querySelector(".finishLine");
var driveInterval = null;
const btns = document.querySelector(".buttonList");
const playbtn = document.querySelector(".play");
const beallitasbtn = document.querySelector(".settings");
const mentesbtn = document.querySelector(".save");
const buybtn = document.querySelector(".buy");
const resetbtn = document.querySelector(".reset");
var gameInterval = null;
var player = null;
const keys = new Set();

var beallitasModal = new bootstrap.Modal('#exampleModal');
var sikerModal = new bootstrap.Modal('#successModal');
var shopModal = new bootstrap.Modal('#shopModal');

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

movePlayer();

function collide(a, b) {
    const pad = 40;
    if ((a.right - pad < b.left + pad) || (a.left + pad > b.right - pad) || (a.bottom - pad < b.top + pad) || (a.top + pad > b.bottom - pad)) return false;
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
var playing = false;

playbtn.addEventListener('click', () => {
    if (driveInterval == null && player == null && gameInterval == null) {
        playing = true;
        resetbtn.classList.toggle('d-none', !playing);
        btns.classList.toggle('d-none', playing)
        beallitasbtn.disabled = true;
        driveInterval = setInterval(() => {
            if (speed < maxSpeed) {
                speed += acceleration;
            }
            currentLeft = parseFloat(gameArea.style.backgroundPositionX) || 0;
            gameArea.style.backgroundPositionX = (currentLeft - speed) + 'px';

            distance += speed;
            Entitasok.setRoadSpeed(speed+5);
            finishLine.style.left = ((currentLaps + 1) * lapLength - distance) + 'px';
            if (finishLine.getBoundingClientRect().left <= player.getRect().right) {
                var x = 0;
                var lapAnim = setInterval(() => {
                    document.querySelector(".lapMessage").classList.toggle('d-none', x % 2 == 1);
                    x++;
                    if (x == 10) clearInterval(lapAnim);
                }, 60);
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
                document.querySelector(".endScore").innerHTML = Math.floor(score);
                document.querySelector(".endLaps").innerHTML = currentLaps;
                var oldBalance = balance;
                balance += Math.floor(score);
                localStorage.setItem("balance", balance);
                document.querySelector(".endBalance").innerHTML = oldBalance + " → " + balance;
                stop();
                vegeModal.show();
            }
        }, 16);

        gameInterval = setInterval(() => {
            var y = Math.random() * (gameArea.offsetHeight - 150);
            var enemySpeed = Math.random() * 4;
            var obj = new Entitasok(gameArea.offsetWidth, y, enemySpeed, ".gameArea");
            obj.move();
            enemies.push(obj);
        }, 225);

        player = new Auto(20, gameArea.offsetHeight / 2.5, 6, ".gameArea");
        document.querySelector(".player").classList.add((equipped!=null) ? `skin${parseInt(equipped)+1}` : "")
    }
});


var lapsInput = document.querySelector(".laps");
var speedInput = document.querySelector(".maxSpeed");
var lapLengthInput = document.querySelector(".lapLength");
var mentve = false;

beallitasbtn.addEventListener('click', () => {
    lapsInput.value = maxLaps;
    speedInput.value = maxSpeed;
    lapLengthInput.value = lapLength;
    document.querySelectorAll("input").forEach(input => input.classList.remove('is-invalid'))
    beallitasModal.show();
});

mentesbtn.addEventListener('click', () => {
    var valid = true;
    document.querySelectorAll("input").forEach(input => input.classList.remove('is-invalid'))

    if (inputEllenorzes(lapsInput.value, 3, 15) == false) {
        lapsInput.classList.add("is-invalid");
        valid = false;
    }
    else if (inputEllenorzes(speedInput.value, 14, 24) == false) {
        speedInput.classList.add("is-invalid");
        valid = false;
    }
    else if (inputEllenorzes(lapLengthInput.value, 4000, 12000) == false) {
        lapLengthInput.classList.add("is-invalid")
        valid = false;
    }

    if (!valid) return;

    maxLaps = Number(lapsInput.value);
    maxSpeed = Number(speedInput.value);
    lapLength = Number(lapLengthInput.value);
    speed = Math.min(speed, maxSpeed);
    document.querySelector(".max-laps").innerHTML = maxLaps;

    beallitasModal.hide();

    sikerModal.show();
});


function inputEllenorzes(value, min, max) {
    var szam = Number(value);

    if (Number.isInteger(szam) && szam >= min && szam <= max) {
        return true;
    }
    return false;
}



function stop() {
    clearInterval(driveInterval);
    driveInterval = null;
    clearInterval(gameInterval);
    gameInterval = null;

    gameArea.querySelectorAll(".player, .entitas").forEach(obj => obj.remove());
    player = null;
    enemies = [];

    currentLaps = 0;
    distance = 0;
    currentLeft = 0;
    score = 0;
    speed = minSpeed;
    lapsMezo.innerHTML = 0;
    scoreMezo.innerHTML = 0;
    gameArea.style.backgroundPositionX = '0px';
    finishLine.style.left = lapLength + 'px';

    playing = false;
    resetbtn.classList.toggle('d-none', !playing);
    btns.classList.toggle('d-none', playing)
    beallitasbtn.disabled = false;
    beallitasbtn.classList.remove('disabled');

}

var vegeModal = new bootstrap.Modal('#endModal');
document.querySelector('#endModal').addEventListener('hidden.bs.modal', stop);




document.querySelector(".modes .easy").addEventListener("click", () => {
    document.querySelector(".laps").value = "3";
    document.querySelector(".maxSpeed").value = "14";
    document.querySelector(".lapLength").value = "5000";
})

document.querySelector(".modes .normal").addEventListener("click", () => {
    document.querySelector(".laps").value = "5";
    document.querySelector(".maxSpeed").value = "18";
    document.querySelector(".lapLength").value = "8000";
})

document.querySelector(".modes .hard").addEventListener("click", () => {
    document.querySelector(".laps").value = "12";
    document.querySelector(".maxSpeed").value = "22";
    document.querySelector(".lapLength").value = "12000";
})

var skinArak = [200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000];
var skinList = document.querySelector(".skins");
var balance = Number(localStorage.getItem("balance")) || 0;
var balanceMezo = document.querySelector(".balance");
var equipped = localStorage.getItem("equipped");

buybtn.addEventListener('click', () => {
    balanceMezo.innerHTML = balance;
    shopModal.show();
    kiir();
});

function kiir() {
    skinList.innerHTML = "";
    for (let i = 0; i < skinArak.length; i++) {
        skinList.innerHTML += `
        <div class="col-3 text-center">
            <img src="img/skin${i + 1}.png" class="img-fluid ${equipped == i ? "hasznalt" : megvan(i) ? "megveve" : ""}" onclick="megvesz(${i})">
            <p class="m-0">${equipped == i ? "Használatban" : megvan(i) ? "Megvéve" : skinArak[i]}</p>
        </div>`
    }
}

function megvesz(i) {
    if (megvan(i)) {
        equipped = i;
        localStorage.setItem("equipped", i);
        kiir();
        return;
    }

    if (balance < skinArak[i]) {
        alert("Nincs elég pénzed!");
        return;
    }

    balance -= skinArak[i];
    localStorage.setItem("skin" + i, "1");
    localStorage.setItem("balance", balance);
    balanceMezo.innerHTML = balance;
    kiir();
}

function megvan(i) {
    return localStorage.getItem("skin" + i) == "1";
}

