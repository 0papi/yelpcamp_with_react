import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, setUserData } = useContext(AuthContext);
  // const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("user");
    setUserData(null);
  };
  return (
    <header className="container">
      <div className="logo">
        <h2>
          <Link to="/">CampHomes</Link>
        </h2>
      </div>

      <nav>
        <ul className="nav">
          <li>
            <Link to="/campgrounds">Camps</Link>
          </li>
          <li>
            <Link to="/campgrounds/new">New</Link>
          </li>
          {user && user ? (
            <li>
              <button className="btn" onClick={onLogout}>
                Logout
              </button>
            </li>
          ) : (
            <div className="auth-actions">
              <li>
                <Link to="/campgrounds/register">Register</Link>
              </li>
              <li>
                <Link to="/campgrounds/login">Login</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
