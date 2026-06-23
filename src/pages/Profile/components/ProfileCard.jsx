import styles from "../Profile.module.css"
const ProfileCard=({ children })=> {
  return (
    <div className={styles.profileCard}>
      {children}
    </div>
  );
}

export default ProfileCard;