import { useRef } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
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
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
