export const addRandomTile = (board) => {
  const emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  if (emptyCells.length === 0) return board;

  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  const newBoard = board.map((row) => [...row]);
  newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;

  return newBoard;
};

export const createBoard = () => {
  let board = Array(4)
    .fill()
    .map(() => Array(4).fill(0));

  board = addRandomTile(board);
  board = addRandomTile(board);

  return board;
};

export const boardsEqual = (a, b) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
};
