var gameArea = document.querySelector(".gameArea");
var driveInterval = null;
const playbtn = document.querySelector(".play")

playbtn.addEventListener('click', () => {
    if (driveInterval == null) {
        driveInterval = setInterval(() => {
            const currentLeft = parseInt(gameArea.style.backgroundPositionX) || 0;
            gameArea.style.backgroundPositionX = (currentLeft - 10) + 'px';
            console.log("mozgatva!")
        }, 16);
    }
})
