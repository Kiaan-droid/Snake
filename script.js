const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");

const appleImage = new Image();
appleImage.src = "assets/apple.png";

appleImage.onload = () => {
    drawFood();
};

canvas.width = 600;
canvas.height = 600;

const gridSize = 25;


// ====================
// SCORE
// ====================

let score = 0;
let highScore = Number(localStorage.getItem("snakeHighScore")) || 0;

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

scoreDisplay.textContent = `Score: ${score}`;
highScoreDisplay.textContent = `High Score: ${highScore}`;


// ====================
// GAME STATE
// ====================

let gameOver = false;


// ====================
// SNAKE
// ====================

let snake = [
    { x: 5, y: 5 }
];

let dx = 1;
let dy = 0;


// ====================
// FOOD
// ====================

let food = {
    x: 10,
    y: 10
};


// ====================
// DRAW SNAKE
// ====================

function drawSnake() {

    snake.forEach((segment, index) => {

        // ====================
        // HEAD
        // ====================

        if (index === 0) {

            ctx.fillStyle = "#22c55e";

            ctx.beginPath();

            ctx.arc(
                segment.x * gridSize + gridSize / 2,
                segment.y * gridSize + gridSize / 2,
                gridSize / 2 - 2,
                0,
                Math.PI * 2
            );

            ctx.fill();


            // ====================
            // EYES
            // ====================

            ctx.fillStyle = "white";

            let eye1X;
            let eye1Y;
            let eye2X;
            let eye2Y;


            // Moving right
            if (dx === 1) {

                eye1X = segment.x * gridSize + 17;
                eye1Y = segment.y * gridSize + 8;

                eye2X = segment.x * gridSize + 17;
                eye2Y = segment.y * gridSize + 17;
            }


            // Moving left
            else if (dx === -1) {

                eye1X = segment.x * gridSize + 8;
                eye1Y = segment.y * gridSize + 8;

                eye2X = segment.x * gridSize + 8;
                eye2Y = segment.y * gridSize + 17;
            }


            // Moving up
            else if (dy === -1) {

                eye1X = segment.x * gridSize + 8;
                eye1Y = segment.y * gridSize + 8;

                eye2X = segment.x * gridSize + 17;
                eye2Y = segment.y * gridSize + 8;
            }


            // Moving down
            else if (dy === 1) {

                eye1X = segment.x * gridSize + 8;
                eye1Y = segment.y * gridSize + 17;

                eye2X = segment.x * gridSize + 17;
                eye2Y = segment.y * gridSize + 17;
            }


            // Draw eyes
            ctx.beginPath();

            ctx.arc(
                eye1X,
                eye1Y,
                3,
                0,
                Math.PI * 2
            );

            ctx.arc(
                eye2X,
                eye2Y,
                3,
                0,
                Math.PI * 2
            );

            ctx.fill();


            // ====================
            // PUPILS
            // ====================

            ctx.fillStyle = "black";

            ctx.beginPath();

            ctx.arc(
                eye1X,
                eye1Y,
                1.5,
                0,
                Math.PI * 2
            );

            ctx.arc(
                eye2X,
                eye2Y,
                1.5,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }


        // ====================
        // TAIL
        // ====================

        else if (index === snake.length - 1) {

            ctx.fillStyle = "#4ade80";

            ctx.beginPath();

            ctx.arc(
                segment.x * gridSize + gridSize / 2,
                segment.y * gridSize + gridSize / 2,
                gridSize / 3,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }


        // ====================
        // BODY
        // ====================

        else {

            ctx.fillStyle = "#4ade80";

            ctx.beginPath();

            ctx.roundRect(
                segment.x * gridSize + 2,
                segment.y * gridSize + 2,
                gridSize - 4,
                gridSize - 4,
                7
            );

            ctx.fill();
        }

    });
}


// ====================
// DRAW FOOD
// ====================

function drawFood() {

    ctx.drawImage(
        appleImage,
        food.x * gridSize,
        food.y * gridSize,
        gridSize,
        gridSize
    );
}


// ====================
// CLEAR SCREEN
// ====================

function clearScreen() {

    ctx.fillStyle = "#111827";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}


// ====================
// GAME OVER SCREEN
// ====================

function drawGameOver() {

    ctx.fillStyle = "white";

    ctx.font = "40px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        canvas.height / 2
    );
}


// ====================
// CHANGE DIRECTION
// ====================

document.addEventListener("keydown", changeDirection);

up.addEventListener("click", () => {
    if (dy !== 1) {
        dx = 0;
        dy = -1;
    }
});

down.addEventListener("click", () => {
    if (dy !== -1) {
        dx = 0;
        dy = 1;
    }
});

left.addEventListener("click", () => {
    if (dx !== 1) {
        dx = -1;
        dy = 0;
    }
});

right.addEventListener("click", () => {
    if (dx !== -1) {
        dx = 1;
        dy = 0;
    }
});

function changeDirection(event) {

    // Restart
    if (event.key === "r" && gameOver) {
        location.reload();
        return;
    }


    // Up
    if (
        (event.key === "ArrowUp" || event.key === "w") &&
        dy !== 1
    ) {

        dx = 0;
        dy = -1;
    }


    // Down
    else if (
        (event.key === "ArrowDown" || event.key === "s") &&
        dy !== -1
    ) {

        dx = 0;
        dy = 1;
    }


    // Left
    else if (
        (event.key === "ArrowLeft" || event.key === "a") &&
        dx !== 1
    ) {

        dx = -1;
        dy = 0;
    }


    // Right
    else if (
        (event.key === "ArrowRight" || event.key === "d") &&
        dx !== -1
    ) {

        dx = 1;
        dy = 0;
    }
}

// ====================
// SAFELY SPAWN FOOD
// ====================

function spawnFood() {
    let validPosition = false;

    while (!validPosition) {
        food.x = Math.floor(Math.random() * 24);
        food.y = Math.floor(Math.random() * 24);

        validPostion = true;

        for(let segment of snake) {
            if (
                food.x === segment.x &&
                food.y === segment.y 
            ) {
                validPostion = false;
                break;
            }
        }
    }
}


// ====================
// UPDATE GAME
// ====================

function update() {

    // Game over?
    if (gameOver) {

        drawGameOver();

        return;
    }


    // Create new head
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };


    // ====================
    // WALL COLLISION
    // ====================

    if (
        head.x < 0 ||
        head.x >= canvas.width / gridSize ||
        head.y < 0 ||
        head.y >= canvas.height / gridSize
    ) {

        gameOver = true;

        return;
    }


    // ====================
    // SELF COLLISION
    // ====================

    for (let i = 0; i < snake.length; i++) {

        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {

            gameOver = true;

            return;
        }
    }


    // Add new head
    snake.unshift(head);


    // ====================
    // FOOD COLLISION
    // ====================

    if (
        head.x === food.x &&
        head.y === food.y
    ) {

        // Increase score
        score++;

        scoreDisplay.textContent = `Score: ${score}`;


        // Update high score
        if (score > highScore) {

            highScore = score;

            highScoreDisplay.textContent =
                `High Score: ${highScore}`;

            localStorage.setItem(
                "snakeHighScore",
                highScore
            );
        }


        // Move food
        food.x = Math.floor(Math.random() * 24);
        food.y = Math.floor(Math.random() * 24);

    }

    else {

        // Didn't eat → remove tail
        snake.pop();
    }


    // ====================
    // DRAW
    // ====================

    clearScreen();

    drawSnake();
    drawFood();
}


// ====================
// GAME LOOP
// ====================

setInterval(update, 150);
