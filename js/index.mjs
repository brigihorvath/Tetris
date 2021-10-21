import Game from './game.mjs';

function buildDom(html) {
  const overlay = document.querySelector('.overlay');
  overlay.innerHTML = html;
}

function buildSplashScreen() {
  buildDom(`<div class="start">
    <img
    src="./img/tetris-icon-12.jpg"
    alt="Tetris"
    class="tetris-img__overlay"
    />
    <h1>TETRIS</h1>
    <button type="button" class="start-button">START</button>
    </div>`);
  document.querySelector('.overlay').style.opacity = '1';
  document.querySelector('.overlay').style.display = 'block';
  const startButton = document.querySelector('button');
  startButton.addEventListener('click', buildGameScreen);
}

function buildGameScreen() {
  document.querySelector('.overlay').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.overlay').style.display = 'none';
  }, 500);

  const canvasElement = document.querySelector('#tetris-canvas');
  const ctx = canvasElement.getContext('2d');
  const scores = document.querySelector('.scores');
  const height = document.querySelector('.board').offsetHeight;
  const blockSize = height / 20;
  const width = blockSize * 10;
  canvasElement.setAttribute('width', width);
  canvasElement.setAttribute('height', height);
  // Scale blocks to 1 * 1 size
  ctx.scale(blockSize, blockSize);
  // console.table will show us the 2D array as a table
  // console.table(game.getZeroArray());

  // I am passing the blocksize, because I want to do the game responsive
  // I am not sure it is going to work
  // Have to think it over in the design phase
  const game = new Game(canvasElement, blockSize);
  game.setScore(buildScoreSection);
  game.gameOver(buildGameOverScreen);

  game.startLoop();

  const moveTetromino = function (event) {
    if (event.code === 'ArrowLeft') game.tetromino.setPosition(-1);
    if (event.code === 'ArrowRight') game.tetromino.setPosition(+1);
    if (event.code === 'ArrowDown') {
      game.tetromino.accelerate();
      game.tetromino.nextMoveLeft = 0;
      game.tetromino.nextMoveRight = 0;
    }
    if (event.code === 'ArrowUp') {
      game.tetromino.rotate();
      game.tetromino.nextMoveLeft = 0;
      game.tetromino.nextMoveRight = 0;
    }
    game.clearCanvas();
    game.tetromino.draw();
  };

  ///////////////////
  //// EVENT LISTENERS
  document.addEventListener('keydown', moveTetromino);

  const pauseButton = document.querySelector('.btn-pause');
  pauseButton.addEventListener('click', () => {
    game.pauseGame();
  });
  //   RESET button doesn't work with buildGameScreen
  //   Needs to be fully resetted (clearcanvas)
  const resetButton = document.querySelector('.btn-reset');
  resetButton.addEventListener('click', () => {
    game.resetGame();
  });
}

function buildGameOverScreen() {
  buildDom(`<div class="restart">
    <img
      src="./img/tetris-icon-12.jpg"
      alt="Tetris"
      class="tetris-img__overlay"
    />
    <h1>GAME OVER</h1>
    <h2>Your points:</h2>
    <p class="game-over-scores"></p>
    <button type="button" class="start-button">RESTART</button>
  </div>`);
  document.querySelector('.overlay').style.opacity = '1';
  document.querySelector('.overlay').style.display = 'block';
  // "this" will be the game because that will call the function
  document.querySelector('.game-over-scores').textContent = this.score;
  const startButton = document.querySelector('.start-button');
  startButton.addEventListener('click', buildGameScreen);
}

function buildScoreSection() {
  // "this" will be the game because that will call the function
  document.querySelector('.scores').textContent = this.score;
  document.querySelector('.level').textContent = this.level;
}

const init = () => {
  buildSplashScreen();
};

window.addEventListener('load', init);
