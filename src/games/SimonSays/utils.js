export const colors = [
  "#FF1744",
  "#00E676",
  "#2979FF",
  "#FFEA00",
  "#aa00f9",
  "#FF9100",
  "#00E5FF",
  "#ff45b4",
  "#FFFFFF",
];

export const randomColorGenerator = () => {
  return Math.floor(Math.random() * 9);
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
