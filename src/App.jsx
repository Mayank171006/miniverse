import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import AuthListener from "./components/AuthListener";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import MobileNav from "./components/MobileNav";
function App() {
  const loading = useSelector((state) => state.user.loading);

  return (
    <>
      <AuthListener />

      {loading ? (
        <>
          <NavBar />
          <div className="home-container">
            <Loader />
          </div>
          <MobileNav />
        </>
      ) : (
        <>
          <NavBar />
          <div className="home-container">
            <Outlet />
          </div>
          <MobileNav />
        </>
      )}
    </>
  );
}

export default App;
