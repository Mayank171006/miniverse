import { useEffect, useState, useRef } from "react";
import styles from "./2048.module.css";
import { addRandomTile, boardsEqual, createBoard } from "./utils/boardUtils";
import { getHighestTile, is2048Present, isGameOver } from "./utils/gameUtils";
import { moveDown, moveLeft, moveRight, moveUp } from "./utils/moveUtils";
import Scoreboard from "./components/Scoreboard";
import Grid from "./components/Grid";
import Overlay from "./components/Overlay";
import { useSelector } from "react-redux";
import { getGameStats, update2048HighestTile, updateGameStats } from "../../firebase/scores";

const Game2048 = () => {
  const [firstStart, setFirstStart] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [grid, setGrid] = useState([
    [0, 2, 4, 8],
    [2, 2048, 2, 2],
    [128, 4, 4096, 4],
    [0, 0, 2, 32],
  ]);
  const [win, setWin] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const touchStart = useRef({ x: 0, y: 0 });

  const user = useSelector((state) => state.user.user);

  //Load the stats from firestore
  useEffect(() => {
    if (!user) {
      setBest(0);
      setPlaying(false);
      setScore(0);
      setFirstStart(false);
      setWin(false);
      setShowOverlay(true);

      setGrid([
        [0, 2, 4, 8],
        [2, 2048, 2, 2],
        [128, 4, 4096, 4],
        [0, 0, 2, 32],
      ]);

      return;
    }

    const loadStats = async () => {
      try {
        const stats = await getGameStats(user.uid, "game2048");

        setBest(stats.bestScore === null ? 0 : stats.bestScore);

        setPlaying(false);
        setScore(0);
        setFirstStart(false);
        setWin(false);
        setShowOverlay(true);

        setGrid([
          [0, 2, 4, 8],
          [2, 2048, 2, 2],
          [128, 4, 4096, 4],
          [0, 0, 2, 32],
        ]);
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    loadStats();
  }, [user]);

  // Save score when game ends
  useEffect(() => {
    if (playing) return;
    if (!firstStart) return;
    if (!user) return;

    const saveScore = async () => {
      try {
        await updateGameStats(user.uid, "game2048", score, true);
        await update2048HighestTile(user.uid,getHighestTile(grid));
      } catch (error) {
        console.error("Failed to save score:", error);
      }
    };

    saveScore();
  }, [playing]);

  // Game Ending/Forwarding Logic
  const handleMove = (result) => {
    let { board: newBoard, scoreGained } = result;

    if (boardsEqual(grid, newBoard)) return;

    newBoard = addRandomTile(newBoard);
    setGrid(newBoard);

    setScore((prev) => {
      const newScore = prev + scoreGained;
      setBest((prev) => Math.max(prev, newScore));
      return newScore;
    });

    if (isGameOver(newBoard)) {
      if (is2048Present(newBoard)) setWin(true);
      setPlaying(false);
      setShowOverlay(true);
    }
  };

  //For handling mobile touch swipes
  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    if (!playing) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const dx = endX - touchStart.current.x;
    const dy = endY - touchStart.current.y;

    const minSwipeDistance = 30;

    if (Math.abs(dx) < minSwipeDistance && Math.abs(dy) < minSwipeDistance)
      return;

    let result;
    if (Math.abs(dx) > Math.abs(dy)) {
      result = dx > 0 ? moveRight(grid) : moveLeft(grid);
    } else {
      result = dy > 0 ? moveDown(grid) : moveUp(grid);
    }

    handleMove(result);
  };

  //Keyboard Arroy Keys Handling
  useEffect(() => {
    if (!playing) return;
    const handleKeyDown = (e) => {
      let result;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case "ArrowLeft":
          result = moveLeft(grid);
          break;
        case "ArrowRight":
          result = moveRight(grid);
          break;
        case "ArrowUp":
          result = moveUp(grid);
          break;
        case "ArrowDown":
          result = moveDown(grid);
          break;
        default:
          return;
      }
      handleMove(result);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, playing]);

  //Start the game
  const startGame = () => {
    setGrid(createBoard());
    setScore(0);
    setPlaying(true);
    setFirstStart(true);
    setShowOverlay(false);
    setWin(false);
  };

  return (
    <div className={styles.mainContainer}>
      <Scoreboard score={score} best={best} />
      <Grid
        handleTouchEnd={handleTouchEnd}
        handleTouchStart={handleTouchStart}
        grid={grid}
      />
      {showOverlay && (
        <Overlay score={score} best={best} firstStart={firstStart} win={win} />
      )}
      <button
        className={`${styles.playButton} ${playing ? styles.disable : null}`}
        onClick={startGame}
      >
        {firstStart ? "Play Again" : "Start Game"}
      </button>
    </div>
  );
};
export default Game2048;
