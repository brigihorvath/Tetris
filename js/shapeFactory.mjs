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
        color: 'rgb(224, 193, 113)',
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
        color: '#c76b6b',
      },
      5: {
        shape: [[1, 1, 1, 1]],
        color: 'teal',
      },
      6: {
        shape: [
          [0, 1, 1],
          [1, 1, 0],
        ],
        color: 'cadetblue',
      },
      7: {
        shape: [
          [0, 0, 1],
          [1, 1, 1],
        ],
        color: 'plum',
      },
    }),
      (this.randomShape = this.randomShapeSelector());
  }

  randomShapeSelector() {
    const randomNum = Math.floor(Math.random() * 7) + 1;
    return this.shapes[randomNum];
  }
}

export default ShapeFactory;
