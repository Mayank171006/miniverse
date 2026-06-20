import { colors } from "../utils";
import styles from "../SimonSays.module.css";
const Grid = ({ showingSequence, activeTile, handleTileClick }) => {
  return (
    <div
      className={`${styles.grid} ${showingSequence ? styles.gridDisabled : ""}`}
    >
      {colors.map((color, index) => (
        <button
          key={index}
          className={`${styles.tile} ${activeTile === index ? styles.tileActive : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => handleTileClick(index)}
        />
      ))}
    </div>
  );
};
export default Grid;
