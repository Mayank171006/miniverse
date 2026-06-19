import { useEffect, useRef, useState } from "react";
import "./ReactionTest.css";
import { randomTimeGenerator, getReactionMessage } from "./utils";
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
    <div className="reaction-test-container">
      <div className="reaction-title-box">
        <span>Reaction Test</span>
      </div>
      <div className="score-board">
        <span> Best: {best == "__" ? `${best}` : `${best} ms`} </span>
        <span> Average: {avg == null ? `__` : `${avg.toFixed(2)} ms`}</span>
      </div>
      <div className={`screen ${screenState}`} onClick={handleClickScreen}>
        <span className="result-time">{message}</span>

        {screenState === "result" && (
          <span className="result-comment">{reactionComment}</span>
        )}
      </div>
      <button
        className={`button ${buttonState}`}
        onClick={startGame}
        disabled={screenState === "wait"}
      >
        {buttonState == "start" ? "Start" : "Play Again"}
      </button>
    </div>
  );
};
export default ReactionTest;