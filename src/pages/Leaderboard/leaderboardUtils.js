import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/config";
export const games = [
  {
    id: "reactionTest",
    name: "⚡ Reaction Test",
  },
  {
    id: "snake",
    name: "🐍 Snake",
  },
  {
    id: "simonSays",
    name: "🧠 Simon Says",
  },
  {
    id: "game2048",
    name: "🧩 2048",
  },
];

export async function getLeaderboard(game) {
  const snapshot = await getDocs(query(collection(db, "users")));

  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      const stats = data.stats?.[game];

      return {
        uid: data.uid || doc.id,
        displayName: data.displayName || "Unknown",
        photoURL: data.photoURL || "",
        score: stats?.bestScore || 0,
        gamesPlayed: stats?.gamesPlayed || 0,
      };
    })
    .filter((player) => player.score > 0)
    .sort((a, b) => {
      if (game === "reactionTest") return a.score - b.score;
      else return b.score - a.score;
    });
}

export const getCurrentUserRank = (players, uid) => {
  return players.findIndex((player) => player.uid === uid) + 1;
};

export const getRankDisplay = (rank) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
};
