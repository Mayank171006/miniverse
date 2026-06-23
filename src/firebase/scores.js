import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export async function updateGameStats(uid, gameName, score, higherIsBetter) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return;
  const data = snapshot.data();
  const currentStats = data.stats?.[gameName] || {};
  const currentBest = currentStats.bestScore;
  const gamesPlayed = currentStats.gamesPlayed || 0;
  const totalScore = currentStats.totalScore || 0;
  const updates = {
    [`stats.${gameName}.gamesPlayed`]: gamesPlayed + 1,
    [`stats.${gameName}.totalScore`]: totalScore + score,
  };
  let shouldUpdateBest = false;

  if (currentBest === undefined) {
    shouldUpdateBest = true;
  } else if (higherIsBetter) {
    shouldUpdateBest = score > currentBest;
  } else {
    shouldUpdateBest = score < currentBest;
  }
  if (shouldUpdateBest) {
    updates[`stats.${gameName}.bestScore`] = score;
  }
  await updateDoc(userRef, updates);
}

export async function getGameStats(uid, gameName) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();
  return (
    data.stats?.[gameName] || {
      bestScore: null,
      gamesPlayed: 0,
      totalScore: 0,
    }
  );
}

export async function update2048HighestTile(uid, highestTile) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return;

  const data = snapshot.data();
  const currentTile = data.stats?.game2048?.highestTile || 0;

  if (highestTile > currentTile) {
    await updateDoc(userRef, {
      "stats.game2048.highestTile": highestTile,
    });
  }
}

export async function getUserData(uid) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}