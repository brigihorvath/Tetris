class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.columnCount = 10;
    this.rowCount = 20;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getZeroArray() {
    // Array.from({length: ...}) => how many elements the array should contain
    // the callback => what these elements will be
    // Array(this.columnCount).fill(0) => every element will be an array
    // with that many elements as columns
    // and each will be zero
    return Array.from({ length: this.rowCount }, () =>
      Array(this.columnCount).fill(0)
    );
  }
}

export default Game;
