import styles from "../Profile.module.css"
const StatCard=({ title, children })=> {
  return (
    <div className={styles.statCard}>
      <h3 className={styles.statTitle}>{title}</h3>
      {children}
    </div>
  );
}

export default StatCard;