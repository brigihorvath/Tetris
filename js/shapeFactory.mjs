class ShapeFactory {
  constructor() {
    (this.shapes = {
      1: {
        shape: [
          [1, 1, 1],
          [0, 1, 0],
        ],
        color: '#232c4b',
      },
      2: {
        shape: [
          [1, 1],
          [1, 1],
        ],
        color: 'yellow',
      },
      3: {
        shape: [
          [1, 1, 0],
          [0, 1, 1],
        ],
        color: 'orange',
      },
      4: {
        shape: [
          [1, 1, 1],
          [0, 0, 1],
        ],
        color: 'red',
      },
      5: {
        shape: [[1, 1, 1, 1]],
        color: 'green',
      },
      6: {
        shape: [
          [0, 1, 1],
          [1, 1, 0],
        ],
        color: 'grey',
      },
    }),
      (this.randomShape = this.randomShapeSelector());
  }

  randomShapeSelector() {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    return this.shapes[randomNum];
  }
}

export default ShapeFactory;
