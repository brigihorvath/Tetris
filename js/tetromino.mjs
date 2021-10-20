import ShapeFactory from './shapeFactory.mjs';

class Tetromino {
  constructor(canvas, blockSize, zeroArray) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.speed = 1;
    this.color;
    // this.shape = [
    //   [1, 1, 1],
    //   [0, 1, 0],
    // ];
    this.shape;
    this.x = 3;
    this.y = 0;
    this.blockSize = blockSize;
    this.canvas.blockWidth = this.canvas.width / this.blockSize;
    this.zeroArr = zeroArray;
  }

  setShapeAndColor() {
    const shapeFactory = new ShapeFactory();
    const shapeObj = shapeFactory.randomShape;
    this.shape = shapeObj.shape;
    this.color = shapeObj.color;
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
      return this;
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
    // console.log('this.x: ', this.x);
    // givin back the tetromino to test if it is OK to move there
    return this;
  }

  accelerate() {
    if (this.checkBoardBottom()) this.y = this.y + 1;
    console.log('accelerate');
    return this;
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

  // checks for every element of the SHAPE that it is at an empty space or not
  // in the zeroArray
  checkIfEmpty() {
    // console.log(tetromino);
    return this.shape.every((arr, y) =>
      arr.every((el, x) =>
        // only checking the elements that are bigger than zero
        el > 0 ? this.zeroArr[this.y + y + 1][this.x + x] === 0 : true
      )
    );
    // I LEAVE THIS HERE FOR TESTING
    // this.shape.forEach((arr, y) =>
    //   arr.forEach((el, x) => {
    //     console.log(`${x},${y}: ${this.zeroArr[this.y + y][this.x + x]}`);
    //     console.log(
    //       `currentPos: tetro.y: ${this.y} tetro.x: ${this.x}  zeroArry: ${
    //         this.y + y
    //       } zeroArrx:
    //             ${this.x + x}`
    //     );
    //   })
    // );
    // console.table(this.zeroArr);
  }
}

export default Tetromino;
