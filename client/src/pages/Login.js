import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();

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
      toast.error("Please provide all fields");
    }
    const userData = { password, email };
    onLoginUser(userData);
  };

  const onLoginUser = async (userLogins) => {
    try {
      const response = await fetch("http://localhost:5000/campgrounds/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userLogins),
      });
      if (!response.ok) {
        throw new Error("Error logging in user");
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
      }
      navigate("/campgrounds");
    } catch (error) {
      toast.error(error.message);
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
          <form onSubmit={onSubmit}>
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
                Submit
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
};

export default Login;
