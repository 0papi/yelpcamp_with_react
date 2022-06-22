import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
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
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
