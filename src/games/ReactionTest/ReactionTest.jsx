import { useEffect, useRef, useState } from "react";
import styles from "./ReactionTest.module.css";
import {
  randomTimeGenerator,
  getReactionMessage,
  screenClasses,
  buttonClasses,
} from "./utils";
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

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

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

  const handleClickScreen = () => {
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
