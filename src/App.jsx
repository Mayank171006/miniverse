import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import AuthListener from "./components/AuthListener";
function App() {
  return (
    <>
      <AuthListener/>
      <NavBar />
      <div className="home-container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
