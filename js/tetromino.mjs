import ShapeFactory from './shapeFactory.mjs';

class Tetromino {
  constructor(canvas, blockSize, zeroArray) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.speed = 1;
    this.color;
    this.shape;
    this.x = 3;
    this.y = 0;
    this.blockSize = blockSize;
    this.canvas.blockWidth = this.canvas.width / this.blockSize;
    this.zeroArr = zeroArray;
  }

  // we create here the random objects from the shapeFactory
  // we get the shape and the color from here
  setShapeAndColor() {
    const shapeFactory = new ShapeFactory();
    const shapeObj = shapeFactory.randomShape;
    this.shape = shapeObj.shape;
    this.color = shapeObj.color;
  }

  // we have to fill the shapes up with color
  // only those ones that's value is not zero
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
      if (this.checkIfEmpty(newShape)) {
        this.shape = newShape;
      }
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
    if (
      direction === -1 &&
      this.checkBoardLeftEdge() &&
      this.checkIfEmpty(this.shape, -1)
    ) {
      this.x = this.x + direction;
    } else if (
      direction === +1 &&
      this.checkBoardRightEdge() &&
      this.checkIfEmpty(this.shape, 1)
    ) {
      this.x = this.x + direction;
    }
  }

  accelerate() {
    if (this.checkBoardBottom() && this.checkIfEmpty(this.shape, 0, 1)) {
    }
    this.y = this.y + 1;
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
  // the shape is needed as a parameter because of the rotation
  checkIfEmpty(shape, directionX = 0, directionY = 0) {
    return shape.every((arr, y) =>
      arr.every((el, x) =>
        // only checking the elements that are bigger than zero
        el > 0
          ? this.zeroArr[this.y + y + directionY][this.x + x + directionX] === 0
          : true
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
