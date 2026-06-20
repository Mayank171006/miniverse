export const getTileStyle = (value) => {
  if (!value) {
    return {
      background: "rgba(255,255,255,0.12)",
      color: "transparent",
    };
  }
  const solidColors = {
    2: "#3B82F6", // Blue
    4: "#10B981", // Emerald
    8: "#FACC15", // Yellow
    16: "#F97316", // Orange
    32: "#EF4444", // Red
    64: "#EC4899", // Pink
    128: "#8B5CF6", // Purple
    256: "#6366F1", // Indigo
    512: "#13b4d1", // Cyan
    1024: "#0a776a", // Teal
  };
  if (solidColors[value]) {
    return {
      background: solidColors[value],
      color: "#fff",
    };
  }
  if (value === 2048) {
    return {
      background: "radial-gradient(circle at 30% 30%, #fde68a, #f59e0b 70%)",
      color: "#fff",
      boxShadow: "0 0 15px rgba(245,158,11,0.5)",
    };
  }
  const gradients = [
    // Cosmic Purple
    "linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)",

    // Cyber Blue
    "linear-gradient(135deg, #c2effb 0%, #0072FF 100%)",

    // Neon Green
    "linear-gradient(135deg, #00F260 0%, #0575E6 100%)",

    // Fire Ice
    "linear-gradient(135deg, #FC466B 0%, #3F5EFB 100%)",

    // Galaxy
    "linear-gradient(135deg, #654EA3 0%, #EAafC8 100%)",

    // Inferno
    "linear-gradient(135deg, #ff61df 0%, #FF4B2B 100%)",
  ];
  const idx = (Math.log2(value) - Math.log2(4096)) % gradients.length;
  return {
    background: gradients[(idx + gradients.length) % gradients.length],
    color: "#fff",
    boxShadow: "0 0 12px rgba(255,255,255,0.15)",
  };
};