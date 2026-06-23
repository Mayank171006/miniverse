import { Link } from "react-router-dom";
import styles from "./Games.module.css";

const GameCard = ({ title, image, path, description }) => {
  return (
    <div className={styles.gameCard}>
      <img src={image} alt={title} className={styles.gameImage} />

      <div className={styles.cardContent}>
        <h3>{title}</h3>

        <p>{description}</p>

        <Link to={path} className={styles.playButton}>
          Play Now →
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
