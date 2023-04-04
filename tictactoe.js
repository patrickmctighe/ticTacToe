let gameBoard = (() => {
    let cells = [
      [1, "a1"],
      [2, "a2"],
      [3, "a3"],
      [4, "b1"],
      [5, "b2"],
      [6, "b3"],
      [7, "c1"],
      [8, "c2"],
      [9, "c3"],
    ];
  
    let players = {
      player1: {
        name: "player one",
        shape: "X",
      },
      player2: {
        name: "player two",
        shape: "O",
      },
    };
  
    let container = document.getElementById("boardArea"); 
    let winningNums = [
      ["a1", "a2", "a3"],
      ["b1", "b2", "b3"],
      ["c1", "c2", "c3"],
      ["a1", "b1", "c1"],
      ["a2", "b2", "c2"],
      ["a3", "b3", "c3"],
      ["a1", "b2", "c3"],
      ["a3", "b2", "c1"],
    ];
    let board = [];
    let p1Moves = [];
    let p2Moves = [];
  
    return {
      cells,
      players,
      container, 
      winningNums,
      board,
      p1Moves,
      p2Moves,
    };
  })();
  
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
    gameBoard.container.addEventListener("click", function makeMove(e) {
      if (
        e.target.innerText !== gameBoard.players.player2.shape &&
        e.target.innerText !== gameBoard.players.player1.shape
      ) {
        if (playNum % 2 == 0) {
          e.target.innerText = gameBoard.players.player2.shape;
          playNum++;
          gameBoard.p2Moves.push(e.target.name);
          if (checkPlayerMovesForWin(gameBoard.p2Moves, gameBoard.winningNums)) { 
            console.log(`${gameBoard.players.player2.name} wins!`);
          }
        } else if (playNum % 2 !== 0) {
          e.target.innerText = gameBoard.players.player1.shape;
          playNum++;
          gameBoard.p1Moves.push(e.target.name);
          if (checkPlayerMovesForWin(gameBoard.p1Moves, gameBoard.winningNums)) { 
            console.log(`${gameBoard.players.player1.name} wins!`);
          }
        }
      }
    });
  }
  
  function checkPlayerMovesForWin(pMoves, winningNums) {
    for (let i = 0; i < winningNums.length; i++) {
      let winner = true;
      for (let j = 0; j < winningNums[i].length; j++) {
        if (pMoves.indexOf(winningNums[i][j]) === -1) {
          winner = false;
          break;
        }
      }
      if (winner) {
        return true;
      }
    }
    return false;
  }
  
  makeMoves();
  makeboard(gameBoard.cells);