const Scoreboard = ({ score, round, highScore }) => {
  return (
    <div className="score-board">
      <span>Score: {score}</span>
      <span>Round: {round}</span>
      <span>Best: {highScore}</span>
    </div>
  );
};
export default Scoreboard;
