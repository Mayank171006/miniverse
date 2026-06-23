import styles from "./Achievements.module.css";

function AchievementCard({ achievement, unlocked }) {
  return (
    <div
      className={`${styles.card} ${unlocked ? styles.unlocked : styles.locked}`}
    >
      <div className={styles.icon}>{achievement.icon}</div>
      <h3>{achievement.title}</h3>
      <p>{achievement.description}</p>
      <span className={styles.status}>{unlocked ? "Unlocked" : "Locked"}</span>
    </div>
  );
}

export default AchievementCard;
