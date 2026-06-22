import { useEffect, useRef, useState } from "react";
import styles from "./ReactionTest.module.css";
import {
  randomTimeGenerator,
  getReactionMessage,
  screenClasses,
  buttonClasses,
} from "./utils";
import { useSelector } from "react-redux";
import { getGameStats, updateGameStats } from "../../firebase/scores";

const ReactionTest = () => {
  const [best, setBest] = useState("__");
  const [totalTime, setTotalTime] = useState(0);
  const [message, setMessage] = useState("Start the Game");
  const [screenState, setScreenState] = useState("start");
  const [buttonState, setButtonState] = useState("start");
  const [gamesCount, setGamesCount] = useState(0);
  const [reactionComment, setReactionComment] = useState("");

  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (!user) {
      setBest("__");
      setGamesCount(0);
      setTotalTime(0);

      setMessage("Start the game");
      setScreenState("start");
      setButtonState("start");
      setReactionComment("");

      return;
    }

    const loadStats = async () => {
      try {
        const stats = await getGameStats(user.uid, "reactionTest");

        setGamesCount(stats.gamesPlayed);
        setTotalTime(stats.totalScore);
        setBest(stats.bestScore === null ? "__" : stats.bestScore);

        setMessage("Start the game");
        setScreenState("start");
        setButtonState("start");
        setReactionComment("");
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    loadStats();
  }, [user]);

  const startGame = () => {
    clearTimeout(timeoutRef.current);

    setScreenState("wait");
    setMessage("Wait for Green...");
    setButtonState("wait");
    const waitTime = randomTimeGenerator();

    timeoutRef.current = setTimeout(() => {
      setScreenState("ready");
      setMessage("CLICK THE SCREEN NOW!!!!");

      startTimeRef.current = Date.now();
    }, waitTime);
  };

  const handleClickScreen = async () => {
    if (screenState === "wait") {
      clearTimeout(timeoutRef.current);

      setMessage("❌ Too Early!!");
      setScreenState("early");
      setButtonState("again");
    }
    if (screenState === "ready") {
      const reactionTime = Date.now() - startTimeRef.current;
      const comment = getReactionMessage(reactionTime);

      setReactionComment(comment);
      setMessage(`${reactionTime} ms`);
      setScreenState("result");
      setButtonState("again");

      if (best === "__" || reactionTime < best) setBest(reactionTime);
      setTotalTime((prev) => prev + reactionTime);
      setGamesCount((prev) => prev + 1);

      if (user) {
        try {
          await updateGameStats(user.uid, "reactionTest", reactionTime, false);
        } catch (error) {
          console.error("Failed to save score:", error);
        }
      }
    }
  };

  const avg = gamesCount === 0 ? null : totalTime / gamesCount;

  return (
    <div className={styles.Container}>
      <div className={styles.titleBox}>Reaction Test</div>

      <div className={styles.scoreBoard}>
        <span>Best: {best === "__" ? "__" : `${best} ms`}</span>

        <span>Average: {avg == null ? "__" : `${avg.toFixed(2)} ms`}</span>
      </div>

      <div
        className={`${styles.screen} ${screenClasses[screenState]}`}
        onClick={handleClickScreen}
      >
        <span className={styles.resultTime}>{message}</span>

        {screenState === "result" && (
          <span className={styles.resultComment}>{reactionComment}</span>
        )}
      </div>

      <button
        className={`${styles.button} ${buttonClasses[buttonState]}`}
        onClick={startGame}
        disabled={screenState === "wait"}
      >
        {buttonState === "start" ? "Start Game" : "Play Again"}
      </button>
    </div>
  );
};
export default ReactionTest;
