const SnakeHeader = ({ score, best }) => {
  return (
    <div className="snake-header">
      <h2>Snake</h2>
      <div>
        <span>Score: {score}</span>
        <span>Best: {best}</span>
      </div>
    </div>
  );
};
export default SnakeHeader;
