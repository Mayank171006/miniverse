import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <NavBar />
      <div className="home-container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
