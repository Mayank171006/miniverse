const sounds = {
  win: new Audio("/sounds/audio_win.mp3"),
  lose: new Audio("/sounds/audio_lose.mp3"),
};
export const playSoundEffect = (effect) => {
  if (effect === "eat") {
    const audio = new Audio("/sounds/audio_eat.mp3");
    audio.play();
    return;
  }
  sounds[effect].currentTime = 0;
  sounds[effect].play();
};
