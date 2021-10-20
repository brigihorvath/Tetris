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
    this.isGameOver = false;
  }

  startLoop() {
    let last = 0;
    let start = 0;
    this.tetromino = new Tetromino(this.canvas, this.blockSize);
    const loop = (now) => {
      this.clearCanvas();
      this.drawZeroArr();
      this.tetromino.draw();
      if (now - last >= 1000) {
        last = now;
        this.tetromino.accelerate();
      }
      // if the Tetromino is at the bottom of the canvas
      if (
        this.tetromino.y + this.tetromino.shape.length ===
        this.canvas.height / this.blockSize
      ) {
        console.log(this.checkIfEmpty());
        this.fillUpArray();
        this.clearCanvas();
        this.drawZeroArr();
        this.tetromino = new Tetromino(this.canvas, this.blockSize);
      }
      if (!this.isGameOver) {
        window.requestAnimationFrame(loop);
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
    this.ctx.fillStyle = 'blue';
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

  // Is this in a better place in the game.mjs????
  checkIfEmpty() {
    return this.tetromino.shape.every((arr, y) =>
      arr.every(
        (el, x) =>
          this.zeroArr[this.tetromino.y + y][this.tetromino.x + x] === 0
      )
    );
    // I LEAVE THIS HERE FOR TESTING
    // this.tetromino.shape.forEach((arr, y) =>
    //   arr.forEach((el, x) => {
    //     console.log(
    //       `${x},${y}: ${
    //         this.zeroArr[this.tetromino.y + y][this.tetromino.x + x]
    //       }`
    //     );
    //     console.log(
    //       `currentPos: tetro.y: ${this.tetromino.y} tetro.x: ${
    //         this.tetromino.x
    //       }  zeroArry: ${this.tetromino.y + y} zeroArrx:
    //             ${this.tetromino.x + x}`
    //     );
    //   })
    // );
    // console.table(this.zeroArr);
  }
}

export default Game;
