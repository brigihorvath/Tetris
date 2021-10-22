import ShapeFactory from './shapeFactory.mjs';

class Tetromino {
  constructor(canvas, blockSize, zeroArray) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    // this.speed = 1;
    // this.color;
    // this.shape;
    this.x = 3;
    this.y = 0;
    this.blockSize = blockSize;
    this.canvas.blockWidth = this.canvas.width / this.blockSize;
    this.zeroArr = zeroArray;
    // nextMoveLeft and nextMoveRight are used to slip the tertromino to place
    // if we (reachTheBottom OR reach the top of another tetromino)
    // AND in the previous states we couldn't go right or left
    // it moves the tetromino just before it fills it up in the zero array
    this.nextMoveLeft = 0;
    this.nextMoveRight = 0;
    // this.isHardDropped = false;
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
      this.checkBoardLeftEdge(this.x) &&
      this.checkIfEmpty(this.shape, -1)
    ) {
      this.nextMoveRight = 0;
      this.nextMoveLeft = 0;
      this.x = this.x + direction;
    } else if (
      direction === +1 &&
      this.checkBoardRightEdge(this.x) &&
      this.checkIfEmpty(this.shape, 1)
    ) {
      this.nextMoveRight = 0;
      this.nextMoveLeft = 0;
      this.x = this.x + direction;
      // We need more else if s, because we want to make the player be able
      // to move the tetromino
    } else if (
      direction === -1 &&
      this.checkBoardLeftEdge(this.x - 1) &&
      this.checkIfEmpty(this.shape, -1, 1)
    ) {
      this.nextMoveLeft = direction;
      this.nextMoveRight = 0;
    } else if (
      direction === 1 &&
      this.checkBoardRightEdge(this.x + 1) &&
      this.checkIfEmpty(this.shape, 1, 1)
    ) {
      this.nextMoveRight = direction;
      this.nextMoveLeft = 0;
    }
  }

  accelerate() {
    if (this.checkBoardBottom() && this.checkIfEmpty(this.shape, 0, 1)) {
      this.y = this.y + 1;
    }
  }

  hardDrop() {
    // save the Y coordinate in case in the meantime the tetromino accelerates
    // console.table(this.zeroArr);
    // let firstOccupiedFieldY = 0;
    // this.zeroArr.forEach((arr, y) => {
    //   arr.forEach((el, x) => {
    //     if (
    //       (this.x - this.shape[0].length <= x || this.x >= x) &&
    //       el === 1 &&
    //       (firstOccupiedFieldY === 0 || firstOccupiedFieldY > y)
    //     ) {
    //       firstOccupiedFieldY = y;
    //     }
    //   });
    // });
    // console.log(`${firstOccupiedFieldY - this.y + 1}`);
    // if (firstOccupiedFieldY === 0) {
    //   this.y = this.zeroArr.length - this.shape.length;
    // } else if (
    //   this.checkIfEmpty(
    //     this.shape,
    //     0,
    //     firstOccupiedFieldY - this.y - this.shape.length + 1
    //   )
    // ) {
    //   this.y = firstOccupiedFieldY - this.shape.length + 1;
    // } else {
    //   this.y = firstOccupiedFieldY - this.shape.length;
    // }
    // this.isHardDropped = true;
    let hardDropY = 0;
    // let firstNotEmpty = this.zeroArr.length - 1;
    this.zeroArr.forEach((arr, y) => {
      arr.forEach((el, x) => {
        if (
          y > this.y + this.shape.length - 1 &&
          y <= this.zeroArr.length - this.shape.length &&
          this.checkIfEmpty(this.shape, 0, y - this.y)
        ) {
          hardDropY = y;
          // } else if (!this.checkIfEmpty(this.shape, 0, y - this.y)) {
          //   firstNotEmpty = y < firstNotEmpty ? y : firstNotEmpty;
          // }
        }
      });
    });
    this.y = hardDropY === 0 ? this.y : hardDropY;
  }

  // to check if the move is valid or not
  // need to pass in x as a parameter
  // because when I wanna check the next state I need another x
  checkBoardRightEdge(x) {
    const shapeLength = this.shape[0].length;
    if (x + shapeLength === this.canvas.blockWidth) {
      return false;
    }
    return true;
  }

  checkBoardLeftEdge(x) {
    if (x <= 0) {
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
