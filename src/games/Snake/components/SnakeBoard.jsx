import { GRID_SIZE } from "../utils";
import styles from "../Snake.module.css";
const SnakeBoard = ({
  snake,
  food,
  direction,
  handleTouchStart,
  handleTouchEnd,
}) => {
  return (
    <div
      className={styles.board}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
        const row = Math.floor(index / GRID_SIZE);
        const col = index % GRID_SIZE;

        const isHead = snake[0].x === col && snake[0].y === row;

        const isBody = snake.some(
          (segment, i) => i !== 0 && segment.x === col && segment.y === row,
        );

        const isFood = food.x === col && food.y === row;

        return (
          <div
            key={index}
            className={`${styles.cell}
              ${isHead ? `${styles.head} ${styles[direction.toLowerCase()]}` : ""}
              ${isBody ? styles.body : ""}
              ${isFood ? styles.food : ""}
            `}
          />
        );
      })}
    </div>
  );
};
export default SnakeBoard;
