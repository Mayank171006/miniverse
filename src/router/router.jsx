import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { createContext } from "react";
import Games from "../pages/Games/Games";
import Leaderboard from "../pages/Leaderboard";
import Profile from "../pages/Profile/Profile";
import Achievements from "../pages/Achievements/Achievements";
import Snake from "../games/Snake/Snake";
import SimonSays from "../games/SimonSays/SimonSays";
import ReactionTest from "../games/ReactionTest/ReactionTest";
import Game2048 from "../games/2048/2048";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Games />,
        },
        {
          path: "leaderboard",
          element: <Leaderboard />,
        },
        {
          path: "achievements",
          element: <Achievements />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "reaction_test",
          element: <ReactionTest />,
        },
        {
          path: "snake",
          element: <Snake />,
        },
        {
          path: "2048",
          element: <Game2048 />,
        },
        {
          path: "simonsays",
          element: <SimonSays />,
        },
      ],
    },
  ],
  {
    basename: "/",
  },
);
