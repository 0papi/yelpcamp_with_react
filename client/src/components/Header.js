import { Link } from "react-router-dom";
const Header = (props) => {
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
          {props.user && props.user ? (
            <li>
              <button className="btn">Logout</button>
            </li>
          ) : (
            <div>
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
