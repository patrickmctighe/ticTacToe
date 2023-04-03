let gameBoard = (() => {
  return {
    cells: [
      [1, Math.random() * 7, 1],
      [2, Math.random() * 7, 2],
      [3, Math.random() * 7, 3],
      [4, Math.random() * 7, 4],
      [5, Math.random() * 7, 5],
      [6, Math.random() * 7, 6],
      [7, Math.random() * 7, 7],
      [8, Math.random() * 7, 8],
      [9, Math.random() * 7, 9],
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
    p1Board: [],
    p2Board: [],
    matchedP1: [],
    matchedP2:[],
    winningNums: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 7],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ],
  };
})();

function makeboard(array) {
  array.forEach(([item, data, name]) => {
    // console.log(data);
    let squares = document.createElement("button");
    squares.setAttribute("class", item);
    squares.setAttribute("id", "squares");
    squares.setAttribute("value", data);
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
        gameBoard.p2Board.push(e.target.name && gameBoard.players.player2.shape);
        // console.log(gameBoard.p2Board);
        // winListP2(gameBoard.p2Board, gameBoard.winningNums);
        // console.log(playNum);
      } else if (playNum % 2 !== 0) {
        e.target.innerText = gameBoard.players.player1.shape;
        playNum++;
        gameBoard.p1Board.push(e.target.name && gameBoard.players.player1.shape);
        // console.log(gameBoard.p1Board);
        winListP1();
        // console.log(playNum);
      }
    }
  });
}
// all the funtions ive tried so far
function winListP1(){
    for (let i = 0; i < gameBoard.winningNums.length; i++){
        if(gameBoard.p1Board.includes(gameBoard.winningNums.indexOf(i))){
         console.log("yey")
        } else { console.log("dang")}
    }
}






let clear = document.querySelector(".clear");
clear.addEventListener("click", clearBoard());
function clearBoard() {
  gameBoard.squares.innerHTML = "";
}

makeMoves();
makeboard(gameBoard.cells);
