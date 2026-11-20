var gameArea = document.querySelector(".gameArea");
var driveInterval = null;
const playbtn = document.querySelector(".play")
const beallitasbtn = document.querySelector(".settings")
var gameInterval = null;
var player = null;
const keys = new Set();
var lapInterval = null;



var maxLaps = 3;
var minSpeed = 6;
var maxSpeed = 9;
var enemyCount = 1;

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

var currentLaps = 0;
var lapsMezo = document.querySelector(".currentLaps")
function lapListener() {
    if (lapInterval == null) {
        lapInterval = setInterval(() => {
            if (currentLeft >= 1 && parseInt(currentLeft) % -2000 == 0) {
                currentLaps ++;
            }
            lapsMezo.innerHTML = currentLaps;
            
            if (currentLaps == 4) {
                alert("Nyertél!")
            }

        }, 20);
    }
}


var currentLeft = 0;
playbtn.addEventListener('click', () => {
    lapListener();
    if (driveInterval == null) {
        driveInterval = setInterval(() => {
            currentLeft = parseInt(gameArea.style.backgroundPositionX) || 0;
            gameArea.style.backgroundPositionX = (currentLeft - minSpeed) + 'px';
        }, 16);
    }
    if (gameInterval == null) {
        gameInterval = setInterval(() => {
            var y = Math.random() * (gameArea.offsetHeight - 150);
            var speed = minSpeed + Math.random() * (maxSpeed-minSpeed);
            var obj = new Entitasok(gameArea.offsetWidth, y, speed, ".gameArea");
            obj.move();
        }, 1000);
    }

    if (player == null) {
        player = new Auto(20, gameArea.offsetHeight / 2.5, 6, ".gameArea");
        movePlayer();
    }
})


const beallitasModal = new bootstrap.Modal('#exampleModal')
var lapsInput = document.querySelector(".laps");
var speedInput = document.querySelector(".maxSpeed");
var enemyInput = document.querySelector(".enemyCount");

beallitasbtn.addEventListener('click', () => {
    lapsInput.value = maxLaps;
    speedInput.value = maxSpeed;
    enemyInput.value = enemyCount;
    beallitasModal.show();
})