import winAudio from "../../assets/sounds/audio_win.mp3";
import loseAudio from "../../assets/sounds/audio_lose.mp3";
import eatAudio from "../../assets/sounds/audio_eat.mp3";
const sounds = {
  win: new Audio(winAudio),
  lose: new Audio(loseAudio),
};
export const playSoundEffect = (effect) => {
  if (effect === "eat") {
    const audio = new Audio(eatAudio);
    audio.play();
    return;
  }
  sounds[effect].currentTime = 0;
  sounds[effect].play();
};
