export const randomTimeGenerator = () => {
  return 2000 + Math.floor(Math.random() * 3000);
};

export const getReactionMessage = (time) => {
  if (time < 180) return "⚡ Lightning Fast!";
  if (time < 250) return "🔥 Amazing Reflexes!";
  if (time < 350) return "🎯 Sharp Reactions!";
  if (time < 500) return "👍 Pretty Good!";
  if (time < 700) return "🐌 A Bit Slow!";
  return "⏰ Too Late!";
};
