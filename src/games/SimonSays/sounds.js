let sounds = [];
for (let i = 1; i <= 9; i++) sounds.push(new Audio(`/sounds/audio_${i}.mp3`));

export const playTileSound = (index) => {
  sounds[index].currentTime = 0;
  sounds[index].play();
};
