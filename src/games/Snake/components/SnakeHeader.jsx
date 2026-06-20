import styles from "../Snake.module.css";
const SnakeHeader = ({ score, best }) => {
  return (
    <div className={styles.header}>
      <h2>Snake</h2>
      <div>
        <span>Score: {score}</span>
        <span>Best: {best}</span>
      </div>
    </div>
  );
};
export default SnakeHeader;
