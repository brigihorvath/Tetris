import Game from './game.mjs';

let playerName = '';

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
    <form>
      <label for="fname" class="form-label">Player's name:</label><br>
      <input type="text" id="fname" name="fname" class="name-input"><br>
    </form>
    <button type="button" class="start-button">START</button>
    </div>`);
  playerName = document.querySelector('.name-input').value;
  document.querySelector('.overlay').style.opacity = '1';
  document.querySelector('.overlay').style.display = 'block';
  const startButton = document.querySelector('button');
  startButton.addEventListener('click', buildGameScreen);
}

function buildGameScreen() {
  playerName = document.querySelector('.name-input')
    ? document.querySelector('.name-input').value
    : playerName;
  document.querySelector('.overlay').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.overlay').style.display = 'none';
  }, 500);

  const canvasElement = document.querySelector('#tetris-canvas');
  const ctx = canvasElement.getContext('2d');
  const scores = document.querySelector('.scores');
  const height = document.querySelector('.game-screen').offsetHeight;
  document.querySelector('.player-name').textContent = playerName
    ? `Player's name: ${playerName}`
    : '';
  //   const blockSize = height / 20;
  const blockSize = height / 20;
  const width = blockSize * 10;
  //   const height = 600;
  canvasElement.setAttribute('width', width);
  canvasElement.setAttribute('height', height);
  // Scale blocks to 1 * 1 size
  ctx.scale(blockSize, blockSize);
  // console.table will show us the 2D array as a table
  // console.table(game.getZeroArray());
  let game = new Game(canvasElement, blockSize);
  game.setScore(buildScoreSection);
  // pass a function to the game object
  // it will store it in the onGameOver function
  // and call it on reset or game over
  game.gameOver(() => {
    buildGameOverScreen.bind(game)();
    // ez kell?????
    // game.resetGame();
    document.removeEventListener('keydown', moveTetromino);
    faIcons.removeEventListener('click', moveTetrominoOnClick);
    pauseButton.removeEventListener('click', () => {
      game.pauseGame();
    });
  });

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
    if (event.code === 'Space') {
      game.tetromino.hardDrop();
    }
    // game.clearCanvas();
    // game.tetromino.draw();
  };

  const moveTetrominoOnClick = function (event) {
    console.log(event.target.closest('.single-icon'));
    const targetedBtn = event.target.closest('.single-icon');
    if (targetedBtn.classList.contains('left')) game.tetromino.setPosition(-1);
    if (targetedBtn.classList.contains('right')) game.tetromino.setPosition(+1);
    if (targetedBtn.classList.contains('down')) {
      game.tetromino.accelerate();
      game.tetromino.nextMoveLeft = 0;
      game.tetromino.nextMoveRight = 0;
    }
    if (targetedBtn.classList.contains('rotate')) {
      game.tetromino.rotate();
      game.tetromino.nextMoveLeft = 0;
      game.tetromino.nextMoveRight = 0;
    }
    if (targetedBtn.classList.contains('hard-drop')) {
      game.tetromino.hardDrop();
    }
    // game.clearCanvas();
    // game.tetromino.draw();
  };

  ///////////////////
  //// EVENT LISTENERS
  document.addEventListener('keydown', moveTetromino);

  const faIcons = document.querySelector('.fa-icons');
  faIcons.addEventListener('click', moveTetrominoOnClick);

  // Maybe the buttons can be also put into the moveTetrominoOnClick function?
  const pauseButton = document.querySelector('.btn-pause');
  pauseButton.addEventListener('click', () => {
    game.pauseGame();
  });
  //   RESET button doesn't work with buildGameScreen
  //   Needs to be fully resetted (clearcanvas)
  const resetButton = document.querySelector('.btn-reset');
  resetButton.addEventListener('click', () => {
    game.resetGame();
    // document.removeEventListener('keydown', moveTetromino);
    // faIcons.removeEventListener('click', moveTetrominoOnClick);
    // pauseButton.removeEventListener('click', () => {
    //   game.pauseGame();
    // });

    // location.reload();
  });
}

function buildGameOverScreen() {
  console.log(this);
  buildDom(`<div class="restart">
    <h1>GAME OVER</h1>
    <h2>Your points:</h2>
    <p class="game-over-scores"></p>
    <h2 class="phs players-highest-score-h">Your highest points:</h2>
    <p class="phs players-highest-score-p"></p>
    <h2 class="ahs all-stars-highest-points-h">All Star High Score:</h2>
    <div class="ahs-flex">
    <p class="ahs highest-scoring-player"></p>
    <p class="ahs all-stars-highest-points-p"></p>
    </div>
    <button type="button" class="start-button">RESTART</button>
  </div>`);
  document.querySelector('.overlay').style.opacity = '1';
  document.querySelector('.overlay').style.display = 'block';
  // "this" will be the game because that will call the function
  document.querySelector('.game-over-scores').textContent = this.score;

  //LOCAL Storage
  // Check if there is data in the localStorage and creates an object that contains
  // all the highest scores
  const phsDOM = document.querySelectorAll('.phs');
  const ahsDOM = document.querySelectorAll('.ahs');
  const highestSPDOM = document.querySelector('.highest-scoring-player');
  const highestScoreDOM = document.querySelector('.all-stars-highest-points-p');
  const playersHighestScoreDOM = document.querySelector(
    '.players-highest-score-p'
  );
  let scores = JSON.parse(localStorage.getItem('scores'));
  let allStarHighestPoint = 0;
  let highestScoringPlayer = '';
  if (scores) {
    for (let key in scores) {
      if (scores[key] > allStarHighestPoint) {
        allStarHighestPoint = scores[key];
        highestScoringPlayer = key;
      }
    }
    if (this.score > allStarHighestPoint) {
      console.log('new high score');
      allStarHighestPoint = scores[playerName];
      highestScoringPlayer = playerName;
      document.querySelector('.ahs-flex').style.display = 'none';
      document.querySelector('h2.ahs').textContent = 'NEW HIGHSCORE';
    }

    highestSPDOM.textContent = highestScoringPlayer;
    highestScoreDOM.textContent = allStarHighestPoint;

    if (scores[playerName] < this.score) {
      console.log('new highest point for the player');
      scores[playerName] = this.score;
      phsDOM.forEach((el) => (el.style.display = 'none'));
      // highestSPDOM.textContent = highestScoringPlayer;
      // highestScoreDOM.textContent = allStarHighestPoint;
      //You have reached a new highscore!
      // All Stars High Score:
    } else if (!scores[playerName]) {
      console.log('new player');
      scores[playerName] = this.score;
      phsDOM.forEach((el) => (el.style.display = 'none'));
      // highestSPDOM.textContent = `${highestScoringPlayer}: `;
      // highestScoreDOM.textContent = allStarHighestPoint;
    } else {
      console.log('existing player, no new high score');
      // highestSPDOM.textContent = highestScoringPlayer;
      // highestScoreDOM.textContent = allStarHighestPoint;
      playersHighestScoreDOM.textContent = scores[playerName];
    }
  } else if (!scores) {
    console.log('new player, new list');
    scores = {};
    scores[playerName] = this.score;
    phsDOM.forEach((el) => (el.style.display = 'none'));
    ahsDOM.forEach((el) => (el.style.display = 'none'));
  }
  // console.log(scor es);
  localStorage.setItem('scores', JSON.stringify(scores));
  document.querySelector('.scores').textContent = 0;
  document.querySelector('.level').textContent = 1;
  const startButton = document.querySelector('.start-button');
  startButton.addEventListener('click', buildGameScreen);
  // startButton.addEventListener('click', () => location.reload());
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
