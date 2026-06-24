import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";
import ProfileCard from "./components/ProfileCard";
import Loader from "../../components/Loader";
import StatCard from "./components/StatCard";
import { getUserData } from "../../firebase/scores";


const Profile = () => {
  const user = useSelector((state) => state.user.user);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        const data = await getUserData(user.uid);
        setProfileData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (!user) {
    return (
      <div className={styles.profilePage}>
        <ProfileCard>
          Please login to view your profile
        </ProfileCard>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  const stats = profileData?.stats || {};

  const reactionTest = stats.reactionTest || {};
  const snake = stats.snake || {};
  const simonSays = stats.simonSays || {};
  const game2048 = stats.game2048 || {};

  const formatAverage = (game) => {
    if (!game.gamesPlayed) return "--";

    return (
      game.totalScore / game.gamesPlayed
    ).toFixed(1);
  };

  const memberSince =
    profileData?.createdAt?.toDate?.()?.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    ) || "Unknown";

  return (
    <div className={styles.profilePage}>
      <ProfileCard>
        <img
          src={profileData.photoURL}
          alt={profileData.displayName}
          className={styles.avatar}
        />

        <div>
          <h1 className={styles.name}>
            {profileData.displayName}
          </h1>

          <p className={styles.info}>
            {profileData.email}
          </p>

          <p className={styles.info}>
            Joined {memberSince}
          </p>
        </div>
      </ProfileCard>

      <div className={styles.statsGrid}>
        <StatCard title="Reaction Test">
          <div className={styles.statRow}>
            <span>Best Time</span>
            <span className={styles.statValue}>
              {reactionTest.bestScore ?? "--"} ms
            </span>
          </div>

          <div className={styles.statRow}>
            <span>Average Time</span>
            <span className={styles.statValue}>
              {formatAverage(reactionTest)} ms
            </span>
          </div>

          <div className={styles.statRow}>
            <span>Total Games</span>
            <span className={styles.statValue}>
              {reactionTest.gamesPlayed ?? 0}
            </span>
          </div>
        </StatCard>

        <StatCard title="Snake">
          <div className={styles.statRow}>
            <span>Best Score</span>
            <span className={styles.statValue}>
              {snake.bestScore ?? "--"}
            </span>
          </div>

          <div className={styles.statRow}>
            <span>Average Score</span>
            <span className={styles.statValue}>
              {formatAverage(snake)}
            </span>
          </div>

          <div className={styles.statRow}>
            <span>Total Games</span>
            <span className={styles.statValue}>
              {snake.gamesPlayed ?? 0}
            </span>
          </div>
        </StatCard>

        <StatCard title="Simon Says">
          <div className={styles.statRow}>
            <span>Best Score</span>
            <span className={styles.statValue}>
              {simonSays.bestScore ?? "--"}
            </span>
          </div>

          <div className={styles.statRow}>
            <span>Average Score</span>
            <span className={styles.statValue}>
              {formatAverage(simonSays)}
            </span>
          </div>

          <div className={styles.statRow}>
            <span>Total Games</span>
            <span className={styles.statValue}>
              {simonSays.gamesPlayed ?? 0}
            </span>
          </div>
        </StatCard>

        <StatCard title="2048">
          <div className={styles.statRow}>
            <span>Best Score</span>
            <span className={styles.statValue}>
              {game2048.bestScore ?? "--"}
            </span>
          </div>

          <div className={styles.statRow}>
            <span>Highest Tile</span>
            <span className={styles.statValue}>
              {game2048.highestTile ?? "--"}
            </span>
          </div>

          <div className={styles.statRow}>
            <span>Average Score</span>
            <span className={styles.statValue}>
              {formatAverage(game2048)}
            </span>
          </div>

          <div className={styles.statRow}>
            <span>Total Games</span>
            <span className={styles.statValue}>
              {game2048.gamesPlayed ?? 0}
            </span>
          </div>
        </StatCard>
      </div>
    </div>
  );
};

export default Profile;