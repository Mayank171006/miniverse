import styles from "../SimonSays.module.css";
const statusClasses = {
  start: styles.statusBoxStart,
  turn: styles.statusBoxTurn,
  correct: styles.statusBoxCorrect,
  gameOver: styles.statusBoxGameOver,
};
const Statusbox = ({ status, message }) => {
  return (
    <div className={`${styles.statusBox} ${statusClasses[status] || ""}`}>
      {message}
    </div>
  );
};
export default Statusbox;
