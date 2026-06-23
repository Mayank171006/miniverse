const createAchievement = (id, title, description, icon, category) => ({
  id,
  title,
  description,
  icon,
  category,
});

export const achievements = [
  // GENERAL
  createAchievement("games_1", "First Steps", "Play 1 game", "🎮", "General"),
  createAchievement(
    "games_5",
    "Getting Started",
    "Play 5 games",
    "🎯",
    "General",
  ),

  createAchievement(
    "games_10",
    "Regular Player",
    "Play 10 games",
    "🔥",
    "General",
  ),

  createAchievement(
    "games_25",
    "Dedicated Gamer",
    "Play 25 games",
    "🏆",
    "General",
  ),

  createAchievement("games_50", "Veteran", "Play 50 games", "⭐", "General"),
  createAchievement(
    "games_100",
    "MiniVerse Pro",
    "Play 100 games",
    "💎",
    "General",
  ),

  createAchievement(
    "games_500",
    "MiniVerse Legend",
    "Play 500 games",
    "👑",
    "General",
  ),

  createAchievement(
    "play_reaction",
    "Reflex Explorer",
    "Play Reaction Test",
    "⚡",
    "General",
  ),

  createAchievement(
    "play_snake",
    "Snake Explorer",
    "Play Snake",
    "🐍",
    "General",
  ),

  createAchievement(
    "play_simon",
    "Memory Explorer",
    "Play Simon Says",
    "🧠",
    "General",
  ),

  createAchievement("play_2048", "2048 Explorer", "Play 2048", "🧩", "General"),

  // REACTION TEST
  ...[450, 400, 350, 300, 275, 250, 225, 200, 180, 160, 140, 120, 100].map(
    (time) =>
      createAchievement(
        `reaction_${time}`,
        `${time}ms Club`,
        `Get below ${time} ms`,
        "⚡",
        "Reaction Test",
      ),
  ),

  ...[5, 10, 25, 50, 100, 200, 500, 1000].map((games) =>
    createAchievement(
      `reaction_games_${games}`,
      `Reaction Veteran ${games}`,
      `Play ${games} Reaction Test games`,
      "⚡",
      "Reaction Test",
    ),
  ),

  createAchievement(
    "reaction_avg_300",
    "Consistent Reflexes",
    "Average under 300 ms",
    "⚡",
    "Reaction Test",
  ),

  createAchievement(
    "reaction_avg_250",
    "Elite Reflexes",
    "Average under 250 ms",
    "⚡",
    "Reaction Test",
  ),

  // SNAKE

  ...[5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200].map((score) =>
    createAchievement(
      `snake_${score}`,
      `Snake ${score}`,
      `Score ${score} in Snake`,
      "🐍",
      "Snake",
    ),
  ),

  ...[5, 10, 25, 50, 100, 200, 500].map((games) =>
    createAchievement(
      `snake_games_${games}`,
      `Snake Veteran ${games}`,
      `Play ${games} Snake games`,
      "🐍",
      "Snake",
    ),
  ),

  ...[100, 500, 1000, 5000].map((score) =>
    createAchievement(
      `snake_total_${score}`,
      `Snake Collector ${score}`,
      `Accumulate ${score} Snake points`,
      "🐍",
      "Snake",
    ),
  ),

  // SIMON SAYS

  ...[3, 5, 8, 10, 12, 15, 20, 25, 30].map((score) =>
    createAchievement(
      `simon_${score}`,
      `Memory ${score}`,
      `Score ${score} in Simon Says`,
      "🧠",
      "Simon Says",
    ),
  ),

  ...[5, 10, 25, 50, 100, 200].map((games) =>
    createAchievement(
      `simon_games_${games}`,
      `Simon Veteran ${games}`,
      `Play ${games} Simon Says games`,
      "🧠",
      "Simon Says",
    ),
  ),

  ...[50, 250, 1000].map((score) =>
    createAchievement(
      `simon_total_${score}`,
      `Memory Collector ${score}`,
      `Accumulate ${score} Simon Says points`,
      "🧠",
      "Simon Says",
    ),
  ),

  // =========================
  // 2048
  // =========================

  ...[128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 131072].map((tile) =>
    createAchievement(
      `tile_${tile}`,
      `${tile} Tile`,
      `Reach ${tile} tile`,
      "🧩",
      "2048",
    ),
  ),

  ...[1000, 2500, 5000, 10000, 20000, 50000, 100000, 200000, 300000].map(
    (score) =>
      createAchievement(
        `2048_score_${score}`,
        `2048 Score ${score}`,
        `Score ${score} in 2048`,
        "🧩",
        "2048",
      ),
  ),

  ...[5, 10, 25, 50, 100, 200, 500].map((games) =>
    createAchievement(
      `2048_games_${games}`,
      `2048 Veteran ${games}`,
      `Play ${games} 2048 games`,
      "🧩",
      "2048",
    ),
  ),

  // MASTERY
  createAchievement(
    "unlock_10",
    "Achievement Hunter",
    "Unlock 10 achievements",
    "🏆",
    "Mastery",
  ),

  createAchievement(
    "unlock_25",
    "Achievement Collector",
    "Unlock 25 achievements",
    "🏆",
    "Mastery",
  ),

  createAchievement(
    "unlock_50",
    "Achievement Expert",
    "Unlock 50 achievements",
    "🏆",
    "Mastery",
  ),

  createAchievement(
    "unlock_75",
    "Achievement Master",
    "Unlock 75 achievements",
    "🏆",
    "Mastery",
  ),

  createAchievement(
    "unlock_all",
    "Completionist",
    "Unlock every achievement",
    "👑",
    "Mastery",
  ),
];
export const TOTAL_ACHIEVEMENTS = achievements.length;
