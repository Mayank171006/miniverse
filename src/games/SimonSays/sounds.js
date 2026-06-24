import audio1 from "../../assets/sounds/audio_1.mp3";
import audio2 from "../../assets/sounds/audio_2.mp3";
import audio3 from "../../assets/sounds/audio_3.mp3";
import audio4 from "../../assets/sounds/audio_4.mp3";
import audio5 from "../../assets/sounds/audio_5.mp3";
import audio6 from "../../assets/sounds/audio_6.mp3";
import audio7 from "../../assets/sounds/audio_7.mp3";
import audio8 from "../../assets/sounds/audio_8.mp3";
import audio9 from "../../assets/sounds/audio_9.mp3";

const sounds = [
  new Audio(audio1),
  new Audio(audio2),
  new Audio(audio3),
  new Audio(audio4),
  new Audio(audio5),
  new Audio(audio6),
  new Audio(audio7),
  new Audio(audio8),
  new Audio(audio9),
];
export const playTileSound = (index) => {
  sounds[index].currentTime = 0;
  sounds[index].play();
};
