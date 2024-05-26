const canvas = document.getElementById('pong-game');
const context = canvas.getContext('2d');
const startButton = document.getElementById('start-game');
const difficultyButtons = document.querySelectorAll('#controls button');
const resetScoresButton = document.getElementById('reset-scores');
const colorSchemeSelect = document.getElementById('color-scheme');
const scoreList = document.getElementById('score-list');

let paddleHeight = 100;
let paddleWidth = 10;
