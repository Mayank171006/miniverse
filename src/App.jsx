import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import AuthListener from "./components/AuthListener";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
function App() {
  const loading = useSelector((state) => state.user.loading);

  if (loading) {
    return <div className="home-container">
        <Loader/>
      </div>;
  }

  return (
    <>
      <AuthListener />
      <NavBar />
      <div className="home-container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
