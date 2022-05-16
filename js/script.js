window.addEventListener("DOMContentLoaded", () => {
  // button click handler

  const boxs = Array.from(document.querySelectorAll(".box"));
  const playerDisplay = document.querySelector("#next-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");
  var disp = document.getElementById("move-count");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;
  count=9;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isValidAction = (box) => {
    if (box.innerText === "X" || box.innerText === "O") {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
    
    count -= 1;
    disp.innerHTML = "Moves Left: " + count;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = "Turn Played By: " + currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };
  //apply event to generate new game state

  // game state renderer renders the generated game state

  // renders text on button clicked with X or O

  // disable the button clicked

  // update panel values such as Turn Played By and Moves Left

  // reset panel values to default values
  

  boxs.forEach((box, index) => {
    box.addEventListener("click", () => userAction(box, index));
  });

  // implement logic to get the winner

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) announce(TIE);
  }

  const userAction = (box, index) => {
    if (isValidAction(box) && isGameActive) {
      box.innerText = currentPlayer;
      box.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  // announce winner

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        alert("Player O Won");
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case PLAYERX_WON:
        alert("Player X Won");
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case TIE:
        announcer.innerText = "Tie";
    }
    announcer.classList.remove("hide");
  };

  // REPLAY-MODE :: replay-game-button-clicked->fetches events recorded->apply event->generates new game state->render game state

  // reset game to start a new
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "O") {
      changePlayer();
    }

    boxs.forEach((box) => {
      box.innerText = "";
      box.classList.remove("playerX");
      box.classList.remove("playerO");
    });
  };

  // bind events to clickable 
  
  resetButton.addEventListener('click', resetBoard);
});
