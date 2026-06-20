import styles from "../SimonSays.module.css";
const Scoreboard = ({ score, round, highScore }) => {
  return (
    <div className={styles.scoreBoard}>
      <span>Score: {score}</span>
      <span>Round: {round}</span>
      <span>Best: {highScore}</span>
    </div>
  );
};
export default Scoreboard;
