import styles from "../2048.module.css";
const Overlay = ({ firstStart, score, best, win }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {!firstStart ? (
          <>
            <h2>2048</h2>

            <p>
              Merge matching tiles to create larger numbers. Reach{" "}
              <strong>2048</strong> to win.
            </p>

            <div className={styles.rules}>
              <h4>⌨️ Keyboard</h4>
              <p>⬅️ ➡️ ⬆️ ⬇️ Arrow Keys</p>

              <h4>📱 Mobile</h4>
              <p>Swipe in any direction</p>

            </div>
          </>
        ) : (
          <>
            <h2>{win ? `🥳 You win` : `💀 Game Over`}</h2>
            {win ? <p>Congratulations!! You have reached 2048</p> : null}
            <p>Score: {score}</p>
            <p>Highest Score: {best}</p>

            <p className={styles.restartText}>
              Press "Play Again" below to restart.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default Overlay;
