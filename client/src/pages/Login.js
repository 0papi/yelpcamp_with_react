import { useState, useContext } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  const { baseUrl, setUserData } = useContext(AuthContext);

  const { password, email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!password || !email) {
      return toast.error("Please provide all fields");
    }
    console.log(formData);
    const userData = { password, email };
    onLoginUser(userData);
  };

  // log in the user
  const onLoginUser = async (userLogins) => {
    console.log(userLogins);
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl + "/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userLogins),
      });
      const data = await response.json();
      if (data) {
        setIsLoading(false);
      }
      console.log(data);
      // check if data is returned and data contains token
      if (data && data.token) {
        console.log(data);
        // persist data to local storage
        localStorage.setItem("user", JSON.stringify(data));
        // update userData auth from context
        setUserData(data);
      }
    } catch (error) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };

  return (
    <div>
      <section className="heading">
        <div className="top">
          <h1>
            <FaSignInAlt />
          </h1>
          <p>Login to your account</p>
        </div>

        <section className="form">
          <form onSubmit={onSubmit} autoComplete="off">
            {/* email */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-block">
                {isLoading ? "Logging in..." : "Submit"}
              </button>
            </div>
          </form>
        </section>
        {/* Sign Up */}
        <div className="form-auth-action">
          <p>Don't have an account?</p>
          <Link to="/campgrounds/register">Register</Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
