import { colors } from "../utils";
const Grid = ({ showingSequence, activeTile, handleTileClick }) => {
  return (
    <div className={`grid ${showingSequence ? "disabled" : ""}`}>
      {colors.map((color, index) => (
        <button
          key={index}
          className={`tile ${activeTile === index ? "active" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => handleTileClick(index)}
        />
      ))}
    </div>
  );
};
export default Grid;
