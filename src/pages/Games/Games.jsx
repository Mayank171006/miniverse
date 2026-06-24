import styles from "./Games.module.css";
import { Link } from "react-router-dom";
import reactionTestImg from "../../assets/images/ReactionTest.png";
import snakeImg from "../../assets/images/Snake.png";
import simonSaysImg from "../../assets/images/SimonSays.png";
import game2048Img from "../../assets/images/2048.png";

const games = [
  {
    title: "Reaction Test",
    image: reactionTestImg,
    path: "/reaction_test",
    description:
      "Test your reflexes and see how quickly you can respond to the signal.",
  },
  {
    title: "Snake",
    image: snakeImg,
    path: "/snake",
    description:
      "Eat, grow, and survive. Avoid collisions while chasing the highest score.",
  },
  {
    title: "Simon Says",
    image: simonSaysImg,
    path: "/simonsays",
    description:
      "Memorize the sequence and repeat it perfectly. How far can your memory take you?",
  },
  {
    title: "2048",
    image: game2048Img,
    path: "/2048",
    description:
      "Merge matching tiles, plan your moves, and reach the legendary 2048 tile.",
  },
];

function Games() {
  return (
    <div className={styles.gamesGrid}>
      {games.map((game) => (
        <div key={game.title} className={styles.gameCard}>
          <img src={game.image} alt={game.title} className={styles.gameImage} />

          <div className={styles.cardContent}>
            <h3>{game.title}</h3>

            <p>{game.description}</p>

            <Link to={game.path} className={styles.playButton}>
              Play Now →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Games;
