export const GRID_SIZE = 20;
export const DIRS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export function generateFoodPosition(snake) {
  while (true) {
    const food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const occupied = snake.some(
      (segment) => segment.x === food.x && segment.y === food.y,
    );

    if (!occupied) return food;
  }
}

export function generateSnakePosition() {
  const snakePos = {
    x: 3 + Math.floor(Math.random() * (GRID_SIZE - 6)),
    y: 3 + Math.floor(Math.random() * (GRID_SIZE - 6)),
  };
  return snakePos;
}
export function calculateSpeed(score) {
  return Math.max(80, 200 - Math.floor(score / 5) * 20);
}
