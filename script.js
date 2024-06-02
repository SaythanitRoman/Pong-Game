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
let isGameRunning = false;
let difficulty = 'medium';


context.fillStyle = 'red';


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
    setDifficulty(difficulty);
    playerScore = 0;
    requestAnimationFrame(gameLoop);
};

const gameLoop = () => {
    if (!isGameRunning) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    updateBall();

    requestAnimationFrame(gameLoop);
};


const drawBall = () => {
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
        ballSpeedX = -ballSpeedX;
    }

    // Отражение мяча от правой стенки
    if (ballX + ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
};






startButton.addEventListener('click', startGame);