import { TOTAL_ACHIEVEMENTS } from "./achievementsData";

export function getUnlockedAchievements(stats) {
  const unlocked = new Set();

  const snake = stats.snake || {};
  const reaction = stats.reactionTest || {};
  const simon = stats.simonSays || {};
  const game2048 = stats.game2048 || {};

  const totalGames =
    (snake.gamesPlayed || 0) +
    (reaction.gamesPlayed || 0) +
    (simon.gamesPlayed || 0) +
    (game2048.gamesPlayed || 0);

  // GENERAL

  [1, 5, 10, 25, 50, 100, 500].forEach((games) => {
    if (totalGames >= games) {
      unlocked.add(`games_${games}`);
    }
  });

  if ((reaction.gamesPlayed || 0) > 0) unlocked.add("play_reaction");

  if ((snake.gamesPlayed || 0) > 0) unlocked.add("play_snake");

  if ((simon.gamesPlayed || 0) > 0) unlocked.add("play_simon");

  if ((game2048.gamesPlayed || 0) > 0) unlocked.add("play_2048");

  // REACTION TEST

  const reactionBest = reaction.bestScore;

  if (reactionBest !== null && reactionBest !== undefined) {
    [450, 400, 350, 300, 275, 250, 225, 200, 180, 160, 140, 120, 100].forEach(
      (time) => {
        if (reactionBest <= time) {
          unlocked.add(`reaction_${time}`);
        }
      },
    );
  }

  [5, 10, 25, 50, 100, 200, 500, 1000].forEach((games) => {
    if ((reaction.gamesPlayed || 0) >= games) {
      unlocked.add(`reaction_games_${games}`);
    }
  });

  if (
    (reaction.gamesPlayed || 0) > 0 &&
    reaction.totalScore / reaction.gamesPlayed <= 300
  ) {
    unlocked.add("reaction_avg_300");
  }

  if (
    (reaction.gamesPlayed || 0) > 0 &&
    reaction.totalScore / reaction.gamesPlayed <= 250
  ) {
    unlocked.add("reaction_avg_250");
  }

  // SNAKE

  [5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200].forEach((score) => {
    if ((snake.bestScore || 0) >= score) {
      unlocked.add(`snake_${score}`);
    }
  });

  [5, 10, 25, 50, 100, 200, 500].forEach((games) => {
    if ((snake.gamesPlayed || 0) >= games) {
      unlocked.add(`snake_games_${games}`);
    }
  });

  [100, 500, 1000, 5000].forEach((score) => {
    if ((snake.totalScore || 0) >= score) {
      unlocked.add(`snake_total_${score}`);
    }
  });

  // SIMON SAYS

  [3, 5, 8, 10, 12, 15, 20, 25, 30].forEach((score) => {
    if ((simon.bestScore || 0) >= score) {
      unlocked.add(`simon_${score}`);
    }
  });

  [5, 10, 25, 50, 100, 200].forEach((games) => {
    if ((simon.gamesPlayed || 0) >= games) {
      unlocked.add(`simon_games_${games}`);
    }
  });

  [50, 250, 1000].forEach((score) => {
    if ((simon.totalScore || 0) >= score) {
      unlocked.add(`simon_total_${score}`);
    }
  });

  // 2048

  [128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 131072].forEach(
    (tile) => {
      if ((game2048.highestTile || 0) >= tile) {
        unlocked.add(`tile_${tile}`);
      }
    },
  );

  [1000, 2500, 5000, 10000, 20000, 50000, 100000, 200000, 300000].forEach(
    (score) => {
      if ((game2048.bestScore || 0) >= score) {
        unlocked.add(`2048_score_${score}`);
      }
    },
  );

  [5, 10, 25, 50, 100, 200, 500].forEach((games) => {
    if ((game2048.gamesPlayed || 0) >= games) {
      unlocked.add(`2048_games_${games}`);
    }
  });

  // MASTERY

  const count = unlocked.size;

  if (count >= 10) unlocked.add("unlock_10");
  if (count >= 25) unlocked.add("unlock_25");
  if (count >= 50) unlocked.add("unlock_50");
  if (count >= 75) unlocked.add("unlock_75");
  if (count >= TOTAL_ACHIEVEMENTS - 1) unlocked.add("unlock_all");

  return unlocked;
}
