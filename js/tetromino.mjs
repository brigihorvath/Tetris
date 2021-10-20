class Tetromino {
  constructor(canvas, blockSize) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.speed = 1;
    this.color = 'blue';
    this.shape = [
      [1, 1, 1],
      [0, 1, 0],
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
    // MY IDEA:
    // the x coordinate becomes the y coordinate
    // the new x coordinate will be: rowLength - 1 - y
    // create a new array with that many rows as many columns we had
    // only rotate if the rotated width (which is currently the shape.length)
    // plus the current coordinate is a lower value than the right edge of the canvas
    if (this.x + this.shape.length <= this.canvas.blockWidth) {
      const newShape = this.shape[0].map((el, oldX) =>
        // fill up the rows with that many elements as many rows we had
        this.shape.map((arr, oldY) => {
          const newElement = this.shape[this.shape.length - 1 - oldY][oldX];
          // console.log(
          //   `oldx: ${oldX} oldY: ${
          //     this.shape.length - 1 - oldY
          //   } newX: ${oldY} newy: ${oldX}`
          // );
          return newElement;
        })
      );
      this.shape = newShape;
      console.log(this.shape);
    }

    // SOLUTION FOR MATRIX ROTATION FROM STACKOVERFLOW
    // https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript
    // takes the indexes from the first row
    // for every index it creates a new row in the new array
    // by taking the row at that index and reversing it
    // if (this.x + this.shape.length <= this.canvas.blockWidth) {
    //   this.shape = this.shape[0].map((val, index) =>
    //     this.shape.map((row) => row[index]).reverse()
    //   );
    // }
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
