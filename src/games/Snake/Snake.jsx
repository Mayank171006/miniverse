import { useEffect, useState } from "react";
import styles from "./Snake.module.css";
import { playSoundEffect } from "./sounds";
import {
  DIRS,
  GRID_SIZE,
  calculateSpeed,
  generateFoodPosition,
  generateSnakePosition,
} from "./utils";
import SnakeHeader from "./components/SnakeHeader";
import SnakeBoard from "./components/SnakeBoard";
import Overlay from "./components/Overlay";
import { useSelector } from "react-redux";
import { getGameStats, updateGameStats } from "../../firebase/scores";

const Snake = () => {
  const initialSnake = [generateSnakePosition()];

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(generateFoodPosition(initialSnake));

  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [firstStart, setFirstStart] = useState(false);

  const [touchStart, setTouchStart] = useState(null);

  const speed = calculateSpeed(score);

  const user = useSelector((state) => state.user.user);

  // Load Stats based on firestore data
  useEffect(() => {
    if (!user) {
      setBest(0);
      setGameOver(false);
      setScore(0);
      setFirstStart(false);

      const newSnake = [generateSnakePosition()];
      setSnake(newSnake);
      setFood(generateFoodPosition(newSnake));
      setDirection("RIGHT");

      return;
    }

    const loadStats = async () => {
      try {
        const stats = await getGameStats(user.uid, "snake");

        setBest(stats.bestScore === null ? 0 : stats.bestScore);

        setGameOver(false);
        setScore(0);
        setFirstStart(false);

        const newSnake = [generateSnakePosition()];
        setSnake(newSnake);
        setFood(generateFoodPosition(newSnake));
        setDirection("RIGHT");
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    loadStats();
  }, [user]);

  // Handle swipe start by storing the initial touch position
  const handleTouchStart = (e) => {
    const touch = e.touches[0];

    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
    });
  };

  // Detect swipe direction and update snake movement accordingly
  const handleTouchEnd = (e) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];

    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) {
        setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev));
      } else if (dx < -30) {
        setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev));
      }
    } else {
      if (dy > 30) {
        setDirection((prev) => (prev !== "UP" ? "DOWN" : prev));
      } else if (dy < -30) {
        setDirection((prev) => (prev !== "DOWN" ? "UP" : prev));
      }
    }

    setTouchStart(null);
  };

  // Play win/lose sound when the game ends
  useEffect(() => {
    if (!gameOver) return;

    if (score === best && score > 0) {
      playSoundEffect("win");
    } else {
      playSoundEffect("lose");
    }
  }, [gameOver]);

  // Save Score in firebase
  useEffect(() => {
    if (!gameOver || !user) return;

    const saveScore = async () => {
      try {
        await updateGameStats(user.uid, "snake", score, true);
      } catch (error) {
        console.error("Failed to save score:", error);
      }
    };

    saveScore();
  }, [gameOver, user]);

  // Listen for keyboard arrow keys to control snake movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setDirection((prev) => (prev !== "DOWN" ? "UP" : prev));
          break;

        case "ArrowDown":
          e.preventDefault();
          setDirection((prev) => (prev !== "UP" ? "DOWN" : prev));
          break;

        case "ArrowLeft":
          e.preventDefault();
          setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev));
          break;

        case "ArrowRight":
          e.preventDefault();
          setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track the highest score achieved
  useEffect(() => {
    setBest((prev) => Math.max(prev, score));
  }, [gameOver, score]);

  // Main game loop: move snake, handle collisions and food consumption
  useEffect(() => {
    if (gameOver || !firstStart) {
      return;
    }

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const dir = DIRS[direction];

        const newHead = {
          x: head.x + dir.x,
          y: head.y + dir.y,
        };
        const ateFood = newHead.x === food.x && newHead.y === food.y;

        // WALL COLLISION
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        //SELF COLLISION
        const hitSelf = prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y,
        );

        if (hitSelf) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Grow snake when food is eaten, otherwise move normally
        if (!ateFood) {
          newSnake.pop();
        } else {
          setScore((prev) => prev + 1);
          setFood(generateFoodPosition(newSnake));
          playSoundEffect("eat");
        }
        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [firstStart, food, direction, gameOver, speed]);

  const handleButtonClick = () => {
    setFirstStart(true);
    setGameOver(false);
    setScore(0);
    const newSnake = [generateSnakePosition()];
    setSnake(newSnake);
    setFood(generateFoodPosition(newSnake));
    setDirection("RIGHT");
  };

  return (
    <div className={styles.screen}>
      <SnakeHeader score={score} best={best} />
      <div className={styles.boardContainer}>
        <SnakeBoard
          snake={snake}
          food={food}
          direction={direction}
          handleTouchEnd={handleTouchEnd}
          handleTouchStart={handleTouchStart}
        />
        <Overlay
          score={score}
          best={best}
          gameOver={gameOver}
          firstStart={firstStart}
        />
      </div>
      <button
        className={`${styles.restartBtn} ${!gameOver && firstStart ? styles.disable : null}`}
        disabled={!gameOver && firstStart}
        onClick={handleButtonClick}
      >
        {firstStart ? "Play Again" : "Start the game"}
      </button>
    </div>
  );
};

export default Snake;
