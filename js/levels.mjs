class Levels {
  constructor() {
    (this.currentLevel = 1),
      (this.levels = {
        1: 1000,
        2: 900,
        3: 800,
        4: 700,
        5: 600,
        6: 500,
        7: 400,
        8: 300,
        9: 200,
        10: 100,
        11: 50,
      });
  }
  setNextLevel(scores) {
    if (scores % 200 === 0) {
      this.currentLevel = scores / 200 + 1;
    }
    console.log(this.levels[this.currentLevel]);
    return this.levels[this.currentLevel];
  }
}

export default Levels;
