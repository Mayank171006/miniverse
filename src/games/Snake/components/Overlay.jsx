const Overlay = ({ gameOver, score, best, firstStart }) => {
  return (
    <>
      {gameOver && (
        <div className="overlay">
          <h2>Game Over!</h2>

          {score === best && score > 0 && <h3>🏆 New High Score!</h3>}
          <p>Score: {score}</p>
          <p>Best: {best}</p>
        </div>
      )}
      {!firstStart && (
        <div className="overlay">
          <h2>Snake</h2>
          <p>⌨️ Arrow Keys</p>
          <p>📱 Swipe to Move</p>
        </div>
      )}
    </>
  );
};
export default Overlay;
