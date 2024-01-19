const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

const totalCells = 100;
const totalBombs = 8;
const maxScore = totalCells - totalBombs;
const bombsList = [];

let score = 0;

//generate random bomb locations
while (bombsList.length < totalBombs){
    const randomNumber = Math.floor(Math.random() * totalCells) +1;

    if (!bombsList.includes(randomNumber)) {
        bombsList.push(randomNumber);
    }
}



for (let i = 1; i <= totalCells; i++) {
    // cell = <div></div>
    const cell = document.createElement('div');
    // cell = <div class="cell"></div>
    cell.classList.add('cell');

    //cell.innerText = i;
  
    //execute function when clicked
    cell.addEventListener('click', function () {
        // Don't do anything if it is already clicked
        if (cell.classList.contains('cell-clicked')) {
          return;
        }
    
        if (bombsList.includes(i)) {
          cell.classList.add('cell-bomb');
          endGame(false);
        } else {
          cell.classList.add('cell-clicked');
          updateScore();

          if ((bombsList.includes(i-1) && (i%10 !== 1))
            || (bombsList.includes(i+1) && (i%10 !== 0))
            || bombsList.includes(i+10)
            || bombsList.includes(i-10))
            {
              cell.innerText = '1';
          } 
          else if((bombsList.includes(i-9) && (i%10 !== 2 || i%10 !== 1)) 
            || (bombsList.includes(i+9) && (i%10 !== 8 || i%10 !== 9))
            || (bombsList.includes(i+11) && (i%10 !== 8 || i%10 !== 9))
            || (bombsList.includes(i-11) && (i%10 !== 2 || i%10 !== 1))
            || (bombsList.includes(i-2) && (i%10 !== 2 || i%10 !== 1))
            || (bombsList.includes(i+2) && (i%10 !== 8 || i%10 !== 9))
            || bombsList.includes(i+20) 
            || bombsList.includes(i-20))
            {
              cell.innerText = '2';
          }

        }

    });
  
    grid.appendChild(cell);
  }


function addNumbers(){
  
}



//updates the score counter
function updateScore(){
    score++;
    scoreCounter.innerText = score.toString().padStart(5, '0');

    if (score == maxScore){
        endGame(true);
    }
}

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WON';
    endGameScreen.classList.add('win');
  }

  revealAllBombs();
  endGameScreen.classList.remove('hidden');
}


function revealAllBombs() {
    const cells = document.querySelectorAll('.cell');
  
    for (let i = 1; i <= cells.length; i++) {
      const cell = cells[i - 1];
  
      if (bombsList.includes(i)) {
        cell.classList.add('cell-bomb');
      }
    }
  }
  
  playAgainButton.addEventListener('click', function () {
    window.location.reload();
  });


