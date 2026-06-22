import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
            <Link className="nav-link nav-comp" to="/">
              <p className="nav-font">Games</p>
            </Link>
            <Link className="nav-link nav-comp" to="/achievements">
              <p className="nav-font">Achievements</p>
            </Link>
            <Link className="nav-link nav-comp" to="/leaderboard">
              <p className="nav-font">Leaderboard</p>
            </Link>
            <Link className="nav-link nav-comp" to="/profile">
              <p className="nav-font">Profile</p>
            </Link>
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
                <div className="login-tooltip">Login to save scores & join leaderboards🏆</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
