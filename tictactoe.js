let gameBoard = (() => {
  return {
    cells: [
      [1, "a1"],
      [2, "a2"],
      [3, "a3"],
      [4, "b1"],
      [5, "b2"],
      [6, "b3"],
      [7, "c1"],
      [8, "c2"],
      [9, "c3"],
    ],

    players: {
      player1: {
        name: "player one",
        shape: "X",
      },
      player2: {
        name: "player two",
        shape: "O",
      },
    },
    container: document.getElementById("boardArea"),
    squares: document.createElement("button"),
    board: [],
    p1Moves: [],
    p2Moves: [],
    p1Pts: 0,
    p2Pts: 0,
    winningNums: [
      ["a1", "a2", "a3"],
      ["b1", "b2", "b3"],
      ["c1", "c2", "c3"],
      ["a1", "b1", "c1"],
      ["a2", "b2", "c2"],
      ["a3", "b3", "c3"],
      ["a1", "b2", "c3"],
      ["a3", "b2", "c1"],
    ],
  };
})();

let p1Name = document.querySelector(".playerOneName");
let p2Name = document.querySelector(".playerTwoName");
let winText = document.querySelector(".youWin");
function makeboard(array) {
  array.forEach(([item, name]) => {
    // console.log(data);
    let squares = document.createElement("button");
    squares.setAttribute("class", item);
    squares.setAttribute("id", "squares");
    squares.setAttribute("name", name);
    gameBoard.container.append(squares);
    return squares;
  });
}

function makeMoves() {
  let playNum = 1;
  gameBoard.container.addEventListener("click", function makeP1Move(e) {
    if (
      e.target.innerText !== gameBoard.players.player2.shape &&
      e.target.innerText !== gameBoard.players.player1.shape
    ) {
      if (playNum % 2 == 0) {
        e.target.innerText = gameBoard.players.player2.shape;
        playNum++;
        gameBoard.p2Moves.push(e.target.name);
        gameBoard.board.push([e.target.name, gameBoard.players.player2.shape]);
        if (checkPlayerMovesForWin(gameBoard.p2Moves, gameBoard.winningNums)) {
          winText.innerHTML = ` ${p2Name.innerHTML} is the Winner!!`;
          playNum = 1;
          updateScore("player2");
        }
      } else if (playNum % 2 !== 0) {
        e.target.innerText = gameBoard.players.player1.shape;
        playNum++;
        gameBoard.p1Moves.push(e.target.name);
        gameBoard.board.push([e.target.name, gameBoard.players.player2.shape]);
        if (checkPlayerMovesForWin(gameBoard.p1Moves, gameBoard.winningNums)) {
          winText.innerHTML = `${p1Name.innerHTML} is the Winner!!`;
          playNum = 1;
          updateScore("player1");
          console.log(gameBoard.p1Moves);
        }
      }
      if( playNum == 10){
        winText.innerHTML = `It's a tie!!`;
      }console.log(playNum)
    }
  });
}
function updateScore(player) {
  let p1Score = document.querySelector(".playerOneScore");
  let p2Score = document.querySelector(".playerTwoScore");
  if (player === "player1") {
    gameBoard.p1Pts++;
    p1Score.innerHTML = `Score: ${gameBoard.p1Pts}`;
  } else {
    gameBoard.p2Pts++;
    p2Score.innerHTML = `Score: ${gameBoard.p2Pts}`;
  }
}

const checkPlayerMovesForWin = (pMoves, winningNums) => {
  return winningNums.some((winningCombination) => {
    return winningCombination.every((square) => pMoves.includes(square));
  });
};

console.log(gameBoard.p1Moves);
let resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  resetBoard();
});
function resetBoard() {
  let squares = document.querySelectorAll("#squares");
  let winText = document.querySelector(".youWin");
  squares.forEach((square) => {
    square.innerHTML = "";
    gameBoard.p1Moves = [];
    gameBoard.p2Moves = [];
    winText.innerHTML = "";
  });
}

document.querySelector(".popForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = document.querySelector(".popForm");
  let player1Name = form.elements[0].value;
  let player2Name = form.elements[1].value;

  if (player1Name != "") {
    let p1Name = document.querySelector(".playerOneName");
    p1Name.innerHTML = `${player1Name}`;
  } 
  
  if (player2Name != "") {
    let p2Name = document.querySelector(".playerTwoName");
    p2Name.innerHTML = `${player2Name}`;
  } 
});

const popUp = document.querySelector(".pop-up");
const startBtn = document.querySelector(".btn");
const gameContainer = document.getElementById("gameContainer");
// Show the pop-up on page load
popUp.style.display = "block";

startBtn.addEventListener("click", () => {
  popUp.style.display = "none";
  gameContainer.style.display = "block";
});

makeMoves();
makeboard(gameBoard.cells);
