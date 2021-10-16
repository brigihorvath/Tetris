# Kraken Brigade

​

## Description

​
Tetris is a game where different shaped objects are coming in the view and the player has to move and/or rotate them that way, that the objects should form a full row. When one row is full, that row disappears and the player gets points. If the objects build up till the top of the view, the game is over.
​

## MVP (DOM - CANVAS)

​

- 1 Player
- Start screen with start button
- Game screen
- Objects coming inside the game area container in a random way: square, L shape, Z shape
- The player should be able to accelerate downwards with the down arrow
- Move the shape to left and right with the left and right arrow
- Rotate the shapes with the up arrow button
- The objects are building up on each other
- If the player manages to create a full line, then the line disappears
- When a row disappears, the user gets points
- If the object reaches the top of the container, the game ends
- Game over screen with the reached score
  ​

## Backlog

​

- more type of shapes
- levels with faster moving objects
- Local Storage
- Audio
  ​

## Data Structure

​

# index.js

​

- buildSplashScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}
  ​

# game.js

​

- Game () {}
- starLoop () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- addObjects () {}
- checkIfFullRow () {}
- addPoints () {}
- GameOver () {}
  ​

# tetrisObject.js

​

- TetrisObject class
- draw () {}
- accelerate () {}
- move () {}
- rotate () {}
- checkScreenBottom () {}
- checkObjectBottom () {}
  ​

​

## States y States Transitions

Definition of the different states and their transition (transition functions)
​

- splashScreen
- gameScreen
- gameOverScreen
  ​

## Task

​

- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- game - starLoop
- game - clearCanvas
- game - updateCanvas
- game - drawCanvas
- game - addObjects
- game - checkIfFullRow
- game - addPoints
- game - GameOver
- tetrisObject - TetrisObject class
- tetrisObject - draw
- tetrisObject - accelerate
- tetrisObject - move
- tetrisObject - rotate
- tetrisObject - checkScreenBottom
- tetrisObject - checkObjectBottom

  ​

## Links

​

### Trello

[Link url](https://trello.com/b/ulOf2Uty/tetris)
​

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/brigihorvath/Tetris)
[Link Deploy](https://github.com/brigihorvath/Tetris)
​

### Slides

URls for the project presentation (slides)
[Link Slides.com]()
