const canvas = document.getElementById('pong-game');
const context = canvas.getContext('2d');
const startButton = document.getElementById('start-game');
const pauseButton = document.getElementById('pause-game');
const difficultyButtons = document.querySelectorAll('#controls button');
const resetScoresButton = document.getElementById('reset-scores');
const colorSchemeSelect = document.getElementById('color-scheme');
const scoreList = document.getElementById('score-list');
const currentScore = document.getElementById('current-score');

let paddleHeight = 100;
let paddleWidth = 10;
let ballRadius = 10;
let playerScore = 0;
let ballX, ballY, ballSpeedX, ballSpeedY;//Положение и скорость по горизонтали и вертикали
let playerY = canvas.height / 2;
let isGameRunning = false;
let difficulty = 'medium';
let isGamePaused = false;

const colorSchemes = {
    default: {
        background: 'rgb(225 225 225)',
        gameBackground: 'rgb(185 185 185)',
        paddle: '#000',
        ball: '#EE2727',
        txtColor: '#000'
    },
    dark: {
        background: '#2d2d30',
        gameBackground: '#3e3e42',
        paddle: '#fff',
        ball: '#007acc',
        txtColor: '#fff'
    },
    light: {
        background: '#FFFFFF',
        gameBackground: '#E8E8E8',
        paddle: '#000',
        ball: '#000',
        txtColor: '#000'
    }
};

const setColorScheme = (scheme) => {
    document.body.style.backgroundColor = colorSchemes[scheme].background;
    document.getElementById("scores").style.color = colorSchemes[scheme].txtColor;
    document.getElementById("current-score").style.color = colorSchemes[scheme].txtColor;
    document.getElementById("pong-game").style.backgroundColor = colorSchemes[scheme].gameBackground;
    paddleColor = colorSchemes[scheme].paddle;
    ballColor = colorSchemes[scheme].ball;
};

const setDifficulty = (level) => {
    difficulty = level;
    switch(level) {
        case 'easy':
            ballSpeedX = 2;
            ballSpeedY = 2;
            break;
        case 'medium':
            ballSpeedX = 4;
            ballSpeedY = 4;
            break;
        case 'hard':
            ballSpeedX = 6;
            ballSpeedY = 6;
            break;
    }
};

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const renderScores = () => {
    scoreList.innerHTML = highScores
        .map(score => `<li>${score}</li>`)
        .join('');
};

const startGame = () => {
    if (isGameRunning) return;
    isGameRunning = true;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    playerY = canvas.height / 2;;
    setDifficulty(difficulty);
    playerScore = 0;
    currentScore.textContent = `Счет: ${playerScore}`;
    requestAnimationFrame(gameLoop);
};

const gameLoop = () => {
    if (!isGameRunning || isGamePaused) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    updateBall();

    requestAnimationFrame(gameLoop);
};

const gameOver = () => {
    isGameRunning = false;
    highScores.push(playerScore);
    highScores.sort((a, b) => b - a);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    renderScores();
};

const pauseGame = () => {
    if (!isGameRunning){
        return;
    } 
    isGamePaused = !isGamePaused;
    if (!isGamePaused) {
        requestAnimationFrame(gameLoop);
    }
};

canvas.addEventListener('mousemove', (e) => {
    const relativeY = e.clientY - canvas.getBoundingClientRect().top;
    if (relativeY > 0 && relativeY < canvas.height - paddleHeight) {
        playerY = relativeY;
    }
});

const drawPaddle = () => {
    context.fillStyle = paddleColor;
    context.fillRect(0, playerY, paddleWidth, paddleHeight);
};

const drawBall = () => {
    context.beginPath();
    context.fillStyle = ballColor;
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
    if (ballX - ballRadius * 2 < 0) {
        //проверка попадания
        if (ballY > playerY && ballY < playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            playerScore++;
            currentScore.textContent = `Счет: ${playerScore}`;
        } else {
            gameOver();
        }
    }

    // Отражение мяча от правой стенки
    if (ballX + ballRadius > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
};

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);
difficultyButtons.forEach(button => {
    button.addEventListener('click', () => setDifficulty(button.id));
});
renderScores();
colorSchemeSelect.addEventListener('change', (e) => setColorScheme(e.target.value));
setColorScheme('default');