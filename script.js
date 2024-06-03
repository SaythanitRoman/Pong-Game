const canvas = document.getElementById('pong-game');
const context = canvas.getContext('2d');
const startButton = document.getElementById('start-game');
const difficultyButtons = document.querySelectorAll('#controls button');
const resetScoresButton = document.getElementById('reset-scores');
const colorSchemeSelect = document.getElementById('color-scheme');
const scoreList = document.getElementById('score-list');

let paddleHeight = 100;
let paddleWidth = 10;
let ballRadius = 10;
let playerScore = 0;
let ballX, ballY, ballSpeedX, ballSpeedY;
let playerY = canvas.height / 2;
let isGameRunning = false;
let difficulty = 'medium';


const setDifficulty = (level) => {
    difficulty = level;
    ballSpeedX = 4;
    ballSpeedY = 4;
};

const startGame = () => {
    if (isGameRunning) return;
    isGameRunning = true;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    playerY = canvas.height / 2;;
    setDifficulty(difficulty);
    playerScore = 0;
    requestAnimationFrame(gameLoop);
};



const gameLoop = () => {
    if (!isGameRunning) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    updateBall();

    requestAnimationFrame(gameLoop);
};

canvas.addEventListener('mousemove', (e) => {
    const relativeY = e.clientY - canvas.getBoundingClientRect().top;
    if (relativeY > 0 && relativeY < canvas.height - paddleHeight) {
        playerY = relativeY;
    }
});

const drawPaddle = () => {
    context.fillStyle = 'black';
    context.fillRect(0, playerY, paddleWidth, paddleHeight);
};

const drawBall = () => {
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
};

const updateBall = () => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Отражение мяча от верхнего и нижнего краёв
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Проверка столкновения мяча с стенкой игрока
    if (ballX - ballRadius < 0) {
        //проверка попадания
        if (ballY > playerY && ballY < playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            playerScore++;
        } else {
            alert("123");
        }
    }

    // Отражение мяча от правой стенки
    if (ballX + ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
};






startButton.addEventListener('click', startGame);