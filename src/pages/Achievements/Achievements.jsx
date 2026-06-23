import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Achievements.module.css";
import Loader from "../../components/Loader";
import { getUserData } from "../../firebase/scores";
import { achievements } from "./achievementsData";
import { getUnlockedAchievements } from "./achievementsUtils";
import AchievementCard from "./AchievementCard";
const categoryOrder = [
  "General",
  "Reaction Test",
  "Snake",
  "Simon Says",
  "2048",
  "Mastery",
];

function Achievements() {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(new Set());

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const loadAchievements = async () => {
      try {
        const data = await getUserData(user.uid);
        const unlockedSet = getUnlockedAchievements(data.stats || {});
        setUnlocked(unlockedSet);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, [user]);

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          Login to view your achievements.
        </div>
      </div>
    );
  }

  if (loading) return <Loader />;

  const unlockedCount = achievements.filter((achievement) =>
    unlocked.has(achievement.id),
  ).length;

  const groupedAchievements = achievements.reduce((acc, achievement) => {
    const category = achievement.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {});

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>🏆 Achievements</h1>
        <p>
          Unlocked {unlockedCount} / {achievements.length}
        </p>
      </div>
      {categoryOrder.map((category) => (
        <div key={category}>
          <h2 className={styles.categoryTitle}>{category}</h2>

          <div className={styles.grid}>
            {(groupedAchievements[category] || []).map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                unlocked={unlocked.has(achievement.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Achievements;
