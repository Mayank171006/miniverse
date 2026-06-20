import styles from "../2048.module.css";
const Scoreboard = ({score,best}) => {
  return (
    <div className={styles.scoreBoard}>
      <span>Score: {score}</span>
      <span>Best: {best}</span>
    </div>
  );
};
export default Scoreboard;
