export const is2048Present = (board) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] >= 2048) return true;
    }
  }
  return false;
};

export const isGameOver = (board) => {
  // Check for empty cell
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) return false;
    }
  }

  // Check horizontal merges
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === board[i][j + 1]) return false;
    }
  }

  // Check vertical merges
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === board[i + 1][j]) return false;
    }
  }

  return true;
};

export const getHighestTile=(board)=>{
  return Math.max(...board.flat());
}