var gameArea = document.querySelector(".gameArea");
var driveInterval = null;
const playbtn = document.querySelector(".play")
var gameInterval = null;


playbtn.addEventListener('click', () => {
    if (driveInterval == null) {
        driveInterval = setInterval(() => {
            const currentLeft = parseInt(gameArea.style.backgroundPositionX) || 0;
            gameArea.style.backgroundPositionX = (currentLeft - 10) + 'px';
            console.log("mozgatva!")
        }, 16);
    }
     if(gameInterval == null){
        gameInterval = setInterval(() => {
            var y = Math.random() * (gameArea.offsetHeight -  150);
            var speed = 6 + Math.random() * 3; 
            var obj = new Entitasok(gameArea.offsetWidth, y, speed, ".gameArea");
            obj.move();
        }, 1000);
    }
})
