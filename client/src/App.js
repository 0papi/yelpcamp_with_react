import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Campgrounds from "./pages/Campgrounds";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CampShow from "./pages/CampShow";
import CampNew from "./pages/CampNew";
import CampEdit from "./pages/CampEdit";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setUser(true);
    setToken(token);
  }, []);

  return (
    <>
      <Router>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campgrounds" element={<Campgrounds />} />
          <Route path="/campgrounds/new" element={<CampNew />} />
          <Route path="/campgrounds/register" element={<Register />} />
          <Route path="/campgrounds/login" element={<Login />} />
          <Route path="/campgrounds/:id" element={<CampShow />} />
          <Route path="/campgrounds/:id/edit" element={<CampEdit />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
