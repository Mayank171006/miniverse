import { useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { login, logout } from "../firebase/auth";

const NavBar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <div className="app-name-container">
          <img src="logo.png" className="logo-image"></img>
          <h1 className="app-name">MiniVerse</h1>
        </div>
        <div id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              className={({ isActive }) =>
                `nav-link nav-comp hide-nav-comp ${isActive ? "active active-nav" : ""}`
              }
              to="/"
            >
              <p className="nav-font">Games</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link nav-comp hide-nav-comp ${isActive ? "active active-nav" : ""}`
              }
              to="/achievements"
            >
              <p className="nav-font">Achievements</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link nav-comp hide-nav-comp ${isActive ? "active active-nav" : ""}`
              }
              to="/leaderboard"
            >
              <p className="nav-font">Leaderboard</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link nav-comp hide-nav-comp ${isActive ? "active active-nav" : ""}`
              }
              to="/profile"
            >
              <p className="nav-font">Profile</p>
            </NavLink>
            {user ? (
              <div className="user-section">
                <button className="nav-link nav-comp" onClick={logout}>
                  <p className="nav-font">Logout</p>
                </button>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="profile-pic"
                />
              </div>
            ) : (
              <div className="user-section">
                <button className="nav-link nav-comp" onClick={login}>
                  <p className="nav-font">Login</p>
                </button>
                <div className="login-tooltip">
                  Login to save scores & rank 🏆
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
