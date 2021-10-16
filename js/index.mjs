function buildDom(html) {
  const main = document.querySelector('.container .board');
  main.innerHTML = html;
}

function buildSplashScreen() {
  document.querySelector('.overlay').style.opacity = '1';
  document.querySelector('.overlay').style.display = 'block';
  //   document.querySelector('.overlay').style.visibility = 'visible';
  //   document.querySelector('.overlay').style.opacity = '1';
  //   buildDom(`
  //         <section class="splash-screen">
  //           <button>Start</button>
  //         </section>
  //       `);
  const startButton = document.querySelector('button');
  startButton.addEventListener('click', buildGameScreen);
}

function buildGameScreen() {
  document.querySelector('.overlay').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.overlay').style.display = 'none';
  }, 500);

  buildDom(`
        <section class="game-screen">
          <canvas></canvas>
        </section>  
      `);

  const width = document.querySelector('.game-screen').offsetWidth;
  const height = document.querySelector('.game-screen').offsetHeight;

  const canvasElement = document.querySelector('canvas');

  canvasElement.setAttribute('width', width);
  canvasElement.setAttribute('height', height);
}

const init = () => {
  buildSplashScreen();
};

window.addEventListener('load', init);
