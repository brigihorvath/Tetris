class Tetromino {
  constructor(canvas, blockSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.speed = 1;
    this.color = 'blue';
    this.shape = [
      [1, 0, 0],
      [1, 1, 1],
    ];
    this.x = 3;
    this.y = 0;
    this.blockSize = blockSize;
    this.canvas.blockWidth = this.canvas.width / this.blockSize;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((arr, i) => {
      arr.forEach((el, index) => {
        if (el > 0) {
          this.ctx.fillRect(this.x + index, this.y + i, 1, 1);
        }
      });
    });
  }
  rotate() {
    this.shape = this.shape[0].map((val, index) =>
      this.shape.map((row) => row[index]).reverse()
    );
  }

  setPosition(direction) {
    if (direction === -1 && this.checkBoardLeftEdge()) {
      this.x = this.x + direction;
    } else if (direction === +1 && this.checkBoardRightEdge()) {
      this.x = this.x + direction;
    }
    console.log('this.x: ', this.x);
  }

  accelerate() {
    if (this.checkBoardBottom()) this.y = this.y + 1;
  }

  // to check if the move is valid or not
  checkBoardRightEdge() {
    const shapeLength = this.shape[0].length;
    if (this.x + shapeLength === this.canvas.blockWidth) {
      return false;
    }
    return true;
  }

  checkBoardLeftEdge() {
    if (this.x <= 0) {
      return false;
    }
    return true;
  }

  checkBoardBottom() {
    const shapeHeight = this.shape.length;
    if (this.y + shapeHeight === this.canvas.height / this.blockSize) {
      return false;
    }
    return true;
  }
}

export default Tetromino;
