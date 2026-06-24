import { NavLink } from "react-router-dom";

const MobileNav=()=> {
  return (
    <div className="mobile-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `mobile-nav-item ${isActive ? "mobile-active" : ""}`
        }
      >
        <span>🎮</span>
        <span>Games</span>
      </NavLink>
      <NavLink
        to="/achievements"
        className={({ isActive }) =>
          `mobile-nav-item ${isActive ? "mobile-active" : ""}`
        }
      >
        <span>🏆</span>
        <span>Achievements</span>
      </NavLink>
      <NavLink
        to="/leaderboard"
        className={({ isActive }) =>
          `mobile-nav-item ${isActive ? "mobile-active" : ""}`
        }
      >
        <span>🎖️</span>
        <span>Leaderboard</span>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `mobile-nav-item ${isActive ? "mobile-active" : ""}`
        }
      >
        <span>👤</span>
        <span>Profile</span>
      </NavLink>
    </div>
  );
}

export default MobileNav;
