import Game from './game.mjs';

function buildDom(html) {
  const main = document.querySelector('.container .board');
  main.innerHTML = html;
}

function buildSplashScreen() {
  document.querySelector('.overlay').style.opacity = '1';
  document.querySelector('.overlay').style.display = 'block';
  //   document.querySelector('.overlay').style.visibility = 'visible';
  //   document.querySelector('.overlay').style.opacity = '1';
  //   buildDom(`
  //         <section class="splash-screen">
  //           <button>Start</button>
  //         </section>
  //       `);
  const startButton = document.querySelector('button');
  startButton.addEventListener('click', buildGameScreen);
}

function buildGameScreen() {
  document.querySelector('.overlay').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.overlay').style.display = 'none';
  }, 500);

  buildDom(`
        <section class="game-screen">
          <canvas id="tetris-canvas"></canvas>
        </section>  
      `);

  const canvasElement = document.querySelector('#tetris-canvas');
  const ctx = canvasElement.getContext('2d');
  const height = document.querySelector('.board').offsetHeight;
  const blockSize = height / 20;
  const game = new Game(canvasElement, blockSize);
  const width = blockSize * 12;

  canvasElement.setAttribute('width', width);
  canvasElement.setAttribute('height', height);

  // Scale blocks
  ctx.scale(blockSize, blockSize);
  console.log(canvasElement.width, blockSize, width, height);

  // console.table will show us the 2D array as a table
  console.table(game.getZeroArray());
  game.startLoop();
  game.tetromino.draw();

  const keys = {
    ArrowLeft: -1,
    ArrowRight: +1,
  };

  const moveTetromino = function (event) {
    if (event.code === 'ArrowLeft') game.tetromino.setPosition(-1);
    if (event.code === 'ArrowRight') game.tetromino.setPosition(+1);
    if (event.code === 'ArrowDown') game.tetromino.accelerate();
    // game.tetromino.checkBoard(blockSize);
    // console.log(game.tetromino.setPosition);
    game.clearCanvas();
    game.tetromino.draw();
  };

  document.addEventListener('keydown', moveTetromino);
}

const init = () => {
  buildSplashScreen();
};

window.addEventListener('load', init);
