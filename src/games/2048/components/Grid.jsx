import styles from "../2048.module.css";
import { getTileStyle } from "../utils/tileStyles";

const Grid = ({ handleTouchEnd, handleTouchStart, grid }) => {
  return (
    <div
      className={styles.grid}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {grid.flat().map((cell, index) => (
        <div
          key={`${index}-${cell}`}
          className={styles.tile}
          style={{
            ...getTileStyle(cell),
            fontSize:
              cell >= 10000 ? "1.2rem" : cell >= 1000 ? "1.4rem" : "1.8rem",
          }}
        >
          {cell || ""}
        </div>
      ))}
    </div>
  );
};
export default Grid;
