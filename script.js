const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Size of the box
let snake = [{ x: 9 * box, y: 9 * box }]; // Initial position of the snake
let direction; // Direction of the snake
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

// Control the snake with arrow keys
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode == 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode == 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode == 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// Check collision with the boundaries
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Move the snake in the direction
    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Check if the snake has eaten the food
    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        // Remove the tail
        snake.pop();
    }

    // Add new head
    const newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over! Refresh to play again.');
    }

    snake.unshift(newHead);
}

// Call draw function every 100 ms
const game = setInterval(draw, 100);


