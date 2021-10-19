import Tetromino from './tetromino.mjs';

class Game {
  constructor(canvas, blockSize) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.columnCount = 10;
    this.rowCount = 20;
    this.tetromino;
    this.blockSize = blockSize;
    this.zeroArr = this.getZeroArray();
  }

  startLoop() {
    let last = 0;
    let start = 0;
    this.tetromino = new Tetromino(this.canvas, this.blockSize);
    const loop = (now) => {
      if (now - last >= 1000) {
        last = now;
        console.log('Loop OK');
        this.tetromino.accelerate();
        this.clearCanvas();
        this.tetromino.draw();
      }
      if (this.tetromino.y === 0) {
        this.fillUpArray();
        console.table(this.zeroArr);
      } else {
        window.requestAnimationFrame(loop);
      }
    };
    window.requestAnimationFrame(loop);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getZeroArray() {
    const emptyArr = [];
    // creation of a 2D array to check if the board's fields are taken
    for (let i = 0; i < this.rowCount; i++) {
      let zeroArr = [];
      for (let z = 0; z < this.columnCount; z++) {
        zeroArr.push(0);
      }
      emptyArr.push(zeroArr);
    }
    return emptyArr;
    // ANOTHER SOLUTION:
    // new Array(x) => x = how many elements the array should contain
    // fill(y) => what the elements will contain
    // return new Array(this.rowCount).fill(new Array(this.columnCount).fill(0));
  }

  fillUpArray() {
    const x = this.tetromino.x;
    const y = this.teromino.y;
    this.tetromino.shape.forEach(row, (i) => {
      this.tetromino.shape.forEach((el, elIndex) => {
        this.zeroArr[y + i][x + elIndex] = el;
      });
    });
  }
}

export default Game;
