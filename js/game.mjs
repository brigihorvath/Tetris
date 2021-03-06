import Tetromino from './tetromino.mjs';
import Levels from './levels.mjs';

class Game {
  constructor(canvas, blockSize) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.columnCount = 10;
    this.rowCount = 20;
    this.blockSize = blockSize;
    this.zeroArr = this.getZeroArray();
    this.isGameOver = false;
    this.isPaused = false;
    // this.animationLoopId;
    this.score = 0;
    this.speed = 1000;
    this.levels = new Levels();
    this.level;
    this.isReset = false;
  }

  startLoop() {
    let last = 0;
    this.tetromino = this.tetromino
      ? this.tetromino
      : new Tetromino(this.canvas, this.blockSize, this.zeroArr);
    this.tetromino.setShapeAndColor();
    const loop = (now) => {
      this.clearCanvas();
      this.drawZeroArr();
      this.tetromino.draw();
      // console.log(this.tetromino);
      if (!this.isPaused && !this.isGameOver) {
        // the tetrominos are accelerating downwards with the speed
        if (now - last >= this.speed) {
          last = now;
          this.tetromino.accelerate();
        }
        // if the Tetromino is at the bottom of the canvas
        // or touches another tetromino
        if (
          this.tetromino.y + this.tetromino.shape.length ===
            this.canvas.height / this.blockSize ||
          !this.tetromino.checkIfEmpty(this.tetromino.shape, 0, 1)
        ) {
          // last move before we save the tetromino in the zeroArray
          if (
            this.tetromino.checkIfEmpty(this.tetromino.shape, -1, 0) &&
            this.tetromino.nextMoveLeft
          )
            this.tetromino.x--;
          if (
            this.tetromino.checkIfEmpty(this.tetromino.shape, 1, 0) &&
            this.tetromino.nextMoveRight
          )
            this.tetromino.x++;

          this.tetromino.draw();
          this.fillUpArray();
          this.setIsGameOver();
          this.clearCanvas();
          this.deleteFullRow();
          this.drawZeroArr();
          // this.tetromino = new Tetromino(
          //   this.canvas,
          //   this.blockSize,
          //   this.zeroArr
          // );
          this.tetromino.reset();
          this.tetromino.setShapeAndColor();
        }
      }
      if (this.isGameOver) {
        this.clearCanvas();
        // this.tetromino = {};
        cancelAnimationFrame(this.animationLoopId);
        this.onGameOver();
      }
      if (!this.isGameOver) {
        this.animationLoopId = window.requestAnimationFrame(loop);
      }
    };
    window.requestAnimationFrame(loop);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // draw the board with the already placed tetrominos
  drawZeroArr() {
    // Maybe refactor
    // The same as the tetromino draw() function
    this.ctx.fillStyle = 'grey';
    this.zeroArr.forEach((arr, i) => {
      arr.forEach((el, index) => {
        if (el > 0) {
          this.ctx.fillRect(index, i, 1, 1);
        }
      });
    });
  }
  // create the initial zero array
  getZeroArray() {
    const emptyArray = [];
    // creation of a 2D array to check if the board's fields are taken
    for (let i = 0; i < this.rowCount; i++) {
      let zeroArray = [];
      for (let z = 0; z < this.columnCount; z++) {
        zeroArray.push(0);
      }
      emptyArray.push(zeroArray);
    }
    // this.zeroArr = emptyArray;
    return emptyArray;
    // ANOTHER SOLUTION:
    // new Array(x) => x = how many elements the array should contain
    // fill(y) => what the elements will contain
    // return new Array(this.rowCount).fill(new Array(this.columnCount).fill(0));
  }
  // fill up the zero Array with the tetrominos, that are already in their places
  fillUpArray() {
    const x = this.tetromino.x;
    const y = this.tetromino.y;
    // loop through the tetromino
    this.tetromino.shape.forEach((row, i) => {
      row.forEach((el, elIndex) => {
        // take only those elements that are bigger than zero
        // otherwise the new elements 0 fields will delete the older element's fields
        if (el > 0) {
          //   console.log(x, y, i, elIndex);
          this.zeroArr[y + i][x + elIndex] = el;
        }
      });
    });
  }
  // delete row if all the fields are covered
  // (every element of the array is 1)
  deleteFullRow() {
    this.zeroArr.forEach((arr, i) => {
      if (!arr.includes(0)) {
        this.score += 100;
        this.speed = this.levels.setNextLevel(this.score);
        this.setLevel();
        this.onLevelChange();
        this.zeroArr.splice(i, 1);
        this.zeroArr.unshift(new Array(this.columnCount).fill(0));
      }
    });
    return this.zeroArr;
  }

  setLevel() {
    this.level = this.levels.currentLevel;
  }

  // wouldn't it be in a better place in index.mjs
  // But how????
  setScore(callback) {
    this.onLevelChange = callback;
  }

  setIsGameOver() {
    if (this.zeroArr[0].includes(1)) {
      this.isGameOver = true;
    }
  }
  // for the reset button we need to set the game over
  // because it needs to clear the canvas and stop the animationframe
  resetGame() {
    this.isGameOver = true;
  }

  gameOver(callback) {
    this.onGameOver = callback;
  }

  pauseGame() {
    this.isPaused = !this.isPaused;
  }
}

export default Game;
