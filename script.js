let box = document.getElementById("box");
let game = document.getElementById("game");
let startButton = document.getElementById("startButton");
let score = 0;
let gameRunning = false;

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    game.style.display = "block";
    gameRunning = true;
    startGame();
});

function startGame() {
    setInterval(dropDoner, 1500);
}

document.addEventListener("keydown", (e) => {
    if(!gameRunning) return;
    if(e.key === "ArrowLeft" && box.offsetLeft > 0) {
        box.style.left = box.offsetLeft - 20 + "px";
    }
if (e.key === "ArrowRight" && box.offsetLeft < 340) {
    box.style.left = box.offsetLeft + 20 + "px";
}

});

game.addEventListener("touchmove", (e) => {
    if(!gameRunning) return;

    let touchX = e.touches[0].clientX;
    let gameRect = game.getBoundingClientRect();
    let x = touchX - gameRect.left;

    if(x > 10 && x < 340) {
        box.style.left = x + "px";
    }
});

function dropDoner() {
    if (!gameRunning) return;

    let doner = document.createElement("img");
    doner.src = "Doener.png";
    doner.className = "doner";
    doner.style.left = Math.random() * 360 + "px";
    doner.style.top = "0px";
    game.appendChild(doner);

    let interval = setInterval(() => {
        doner.style.top = doner.offsetTop + 5 + "px";

        let donerRect = doner.getBoundingClientRect();
        let boxRect = box.getBoundingClientRect();

        if (
            donerRect.bottom >= boxRect.top &&
            donerRect.top <= boxRect.bottom &&
            donerRect.left <= boxRect.right &&
            donerRect.right >= boxRect.left
        ) {
            score++;
            document.getElementById("scoreDisplay").textContent = "Punkte: " + score;
            clearInterval(interval);
            doner.remove();
        } else if (doner.offsetTop > game.offsetHeight) {
            clearInterval(interval);
            doner.remove();
        }
    }, 50);
}

