import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Leaderboard.module.css";
import {
  getRankDisplay,
  games,
  getLeaderboard,
  getCurrentUserRank,
} from "./leaderboardUtils";

const Leaderboard = () => {
  const user = useSelector((state) => state.user.user);
  const [selectedGame, setSelectedGame] = useState("reactionTest");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const leaderboard = await getLeaderboard(selectedGame);
        setPlayers(leaderboard);
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [selectedGame]);

  const topPlayers = players.slice(0, 10);
  const currentUserRank = user ? getCurrentUserRank(players, user.uid) : 0;

  const currentUserData = user
    ? players.find((player) => player.uid === user.uid)
    : null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>🏆 Leaderboards</h1>
        <div className={styles.gameSelector}>
          {games.map((game) => (
            <button
              key={game.id}
              className={`${styles.gameButton} ${
                selectedGame === game.id ? styles.activeGame : ""
              }`}
              onClick={() => setSelectedGame(game.id)}
            >
              {game.name}
            </button>
          ))}
        </div>
        {loading ? (
          <div className={styles.card}>Loading leaderboard...</div>
        ) : players.length === 0 ? (
          <div className={styles.card}>No scores available yet.</div>
        ) : (
          <>
            <div className={styles.listCard}>
              <h2 className={styles.sectionTitle}>Top 10 Players</h2>
              <div className={styles.leaderboard}>
                {topPlayers.map((player, index) => (
                  <div key={player.uid} className={styles.row}>
                    <div className={styles.leftSection}>
                      <span className={styles.position}>
                        {getRankDisplay(index + 1)}
                      </span>
                      <div className={styles.playerInfo}>
                        <div className={styles.playerName}>
                          {player.displayName}
                        </div>
                        <div className={styles.gamesPlayed}>
                          {player.gamesPlayed} games
                        </div>
                      </div>
                    </div>
                    <div className={styles.scoreValue}>
                      {player.score}
                      {selectedGame === "reactionTest" ? " ms" : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {user && (
              <div className={styles.currentUser}>
                <div className={styles.currentUserTitle}>⭐ Your Ranking</div>
                <div className={styles.currentUserInfo}>
                  <div>
                    <div className={styles.playerName}>
                      {currentUserRank
                        ? `${getRankDisplay(currentUserRank)} ${currentUserData?.displayName}`
                        : "Not Ranked"}
                    </div>
                    <div className={styles.gamesPlayed}>
                      {currentUserData?.gamesPlayed || 0} games played
                    </div>
                  </div>
                  <div className={styles.scoreValue}>
                    {currentUserData?.score || 0}{" "}
                    {selectedGame === "reactionTest" ? " ms" : null}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
