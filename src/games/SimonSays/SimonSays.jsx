import { useEffect, useRef, useState } from "react";
import styles from "./SimonSays.module.css";
import { playTileSound } from "./sounds";
import Scoreboard from "./components/Scoreboard";
import Statusbox from "./components/Statusbox";
import Grid from "./components/Grid";
import { randomColorGenerator, sleep } from "./utils";
import { useSelector } from "react-redux";
import { getGameStats, updateGameStats } from "../../firebase/scores";

const SimonSays = () => {
  const [activeTile, setActiveTile] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState(
    "Welcome to Simon Says!! Press Start & Repeat the sequence given by Simon",
  );
  const [status, setStatus] = useState("start");
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [showingSequence, setShowingSequence] = useState(false);
  const cancelledRef = useRef(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      setHighScore(0);
      setActiveTile(null);
      setRound(1);
      setScore(0);
      setStatus("start");
      setMessage(
        "Welcome to Simon Says!! Press Start & Repeat the sequence given by Simon",
      );
      setSequence([]);
      setUserSequence([]);
      setPlaying(false);
      cancelledRef.current = true;
      setShowingSequence(false);
      return;
    }

    const loadStats = async () => {
      try {
        const stats = await getGameStats(user.uid, "simonSays");

        setHighScore(stats.bestScore === null ? 0 : stats.bestScore);
        setActiveTile(null);
        setRound(1);
        setScore(0);
        setStatus("start");
        setMessage(
          "Welcome to Simon Says!! Press Start & Repeat the sequence given by Simon",
        );
        setSequence([]);
        setUserSequence([]);
        setPlaying(false);
        cancelledRef.current = false;
        setShowingSequence(false);
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    loadStats();
  }, [user]);

  const showSequence = async (arr) => {
    const onTime = Math.max(300, 1000 - round * 40);
    const offTime = Math.max(150, 500 - round * 15);
    setShowingSequence(true);
    setMessage("Watch Carefully!!!");
    setStatus("start");
    for (const idx of arr) {
      setActiveTile(idx);
      playTileSound(idx);
      if (cancelledRef.current) return;
      await sleep(onTime);
      setActiveTile(null);
      if (cancelledRef.current) return;
      await sleep(offTime);
    }
    if (cancelledRef.current) return;
    setMessage("Your Turn");
    setStatus("turn");
    setShowingSequence(false);
  };

  const generateSimonSequence = async (currRound) => {
    const arr = [...sequence, randomColorGenerator()];
    setSequence(arr);
    setUserSequence([]);
    await showSequence(arr);
  };

  const startGame = async () => {
    cancelledRef.current = false;
    setPlaying(true);
    setScore(0);
    setRound(1);
    setUserSequence([]);

    const firstSequence = [randomColorGenerator()];

    setSequence(firstSequence);

    await showSequence(firstSequence);
  };

  const resetGame = () => {
    cancelledRef.current = true;
    setPlaying(false);
    setScore(0);
    setRound(1);
    setSequence([]);
    setUserSequence([]);
    setMessage("Press Start");
    setStatus("start");
    setActiveTile(null);
  };

  const handleTileClick = async (index) => {
    if (!playing || showingSequence) return;
    setActiveTile(index);
    playTileSound(index);
    setTimeout(() => {
      setActiveTile(null);
    }, 200);

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);
    const currentPos = newUserSequence.length - 1;

    if (sequence[currentPos] !== index) {
      setStatus("gameOver");
      setMessage(`💀 Game Over! Score: ${score}`);
      setTimeout(() => {
        resetGame();
      }, 3000);
      if (score > highScore) {
        setHighScore(score);
      }
      if (user) {
        try {
          await updateGameStats(user.uid, "simonSays", score, true);
        } catch (error) {
          console.error("Failed to save score:", error);
        }
      }
      setPlaying(false);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      const newScore = score + 1;
      setScore(newScore);

      setStatus("correct");
      if (newScore > highScore) {
        setHighScore(newScore);
        setMessage("🎉 New High Score!");
      } else {
        setMessage("✅ Correct!");
      }

      const nextRound = round + 1;
      setRound(nextRound);
      await sleep(1000);
      generateSimonSequence(nextRound);
    }
  };

  return (
    <div className={styles.simonContainer}>
      <Scoreboard score={score} round={round} highScore={highScore} />
      <Statusbox status={status} message={message} />
      <Grid
        activeTile={activeTile}
        showingSequence={showingSequence}
        handleTileClick={handleTileClick}
      />

      <button
        className={`${styles.button} ${
          playing ? styles.buttonReset : styles.buttonStart
        }`}
        onClick={playing ? resetGame : startGame}
      >
        {playing ? "Reset Game" : "Start Game"}
      </button>
    </div>
  );
};

export default SimonSays;
