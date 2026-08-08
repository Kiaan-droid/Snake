const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

canvas.width = 600;
canvas.height = 600;

let score = 0;
let gameOver = false;

const gridSize = 25;

// ====================
// SNAKE
// ====================

let snake = [
    { x: 5, y: 5 }
];

// Direction
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

    ctx.fillStyle = "#4ade80";

    snake.forEach(segment => {

        ctx.fillRect(
            segment.x * gridSize + 2,
            segment.y * gridSize + 2,
            gridSize - 4,
            gridSize - 4
        );

    });
}


// ====================
// DRAW FOOD
// ====================

function drawFood() {

    ctx.fillStyle = "#ef4444";
    ctx.beginPath();

    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}


// ====================
// CLEAR SCREEN
// ====================

function clearScreen() {

    ctx.fillStyle = "#1d1d1d";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}


// ====================
// CHANGE DIRECTION
// ====================

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

    if (event.key === "ArrowUp" || event.key === "w") {
        dx = 0;
        dy = -1;
    }

    else if (event.key === "ArrowDown" || event.key === "s") {
        dx = 0;
        dy = 1;
    }

    else if (event.key === "ArrowLeft" || event.key === "a") {
        dx = -1;
        dy = 0;
    }

    else if (event.key === "ArrowRight" || event.key === "d") {
        dx = 1;
        dy = 0;
    }

    if (event.key === "r") {
        reload();
    }
}

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

function reload() {
    location.reload();
}

// ====================
// GAME UPDATE
// ====================

function update() {

    if(gameOver) {
        drawGameOver();
        return;
    }

    // Create the new head
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

        score++;

        scoreDisplay.textContent = `Score: ${score}`;
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

setInterval(update, 100);