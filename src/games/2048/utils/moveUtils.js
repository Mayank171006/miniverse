const transpose = (board) => {
  const result = Array.from(
    { length: 4 },
    () => Array(4)
  );

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      result[j][i] = board[i][j];
    }
  }

  return result;
};
export const moveLeft = (board) => {
  let newBoard = [];
  let scoreGained = 0;
  for (let i = 0; i < 4; i++) {
    let prevRow = [];
    let newRow = [];
    for (let j = 0; j < 4; j++) {
      if (board[i][j]) prevRow.push(board[i][j]);
    }
    let L = prevRow.length;
    for (let j = 0; j < L; j++) {
      if (j + 1 < L && prevRow[j] === prevRow[j + 1]) {
        newRow.push(2 * prevRow[j]);
        scoreGained += 2 * prevRow[j];
        j++;
      } else {
        newRow.push(prevRow[j]);
      }
    }
    while (newRow.length < 4) newRow.push(0);
    newBoard[i] = newRow;
  }
  return { board: newBoard, scoreGained: scoreGained };
};

export const moveRight = (board) => {
  let newBoard = [];
  let scoreGained = 0;
  for (let i = 0; i < 4; i++) {
    let prevRow = [];
    let newRow = [];
    for (let j = 3; j >=0; j--) {
      if (board[i][j]) prevRow.push(board[i][j]);
    }
    let L = prevRow.length;
    for (let j = 0; j < L; j++) {
      if (j + 1 < L && prevRow[j] === prevRow[j + 1]) {
        newRow.unshift(2 * prevRow[j]);
        scoreGained += 2 * prevRow[j];
        j++;
      } else {
        newRow.unshift(prevRow[j]);
      }
    }
    while (newRow.length < 4) newRow.unshift(0);
    newBoard[i] = newRow;
  }
  return { board: newBoard, scoreGained: scoreGained };
};
export const moveUp=(board)=>{
  const transposedBoard=transpose(board);
  const {board:newTransposedBoard,scoreGained}=moveLeft(transposedBoard);
  const newBoard=transpose(newTransposedBoard);
  return { board: newBoard, scoreGained: scoreGained };
}
export const moveDown=(board)=>{
  const transposedBoard=transpose(board);
  const {board:newTransposedBoard,scoreGained}=moveRight(transposedBoard);
  const newBoard=transpose(newTransposedBoard);
  return { board: newBoard, scoreGained: scoreGained };
}
