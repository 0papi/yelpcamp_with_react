import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { email, username, password, password2 } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!password === password2) {
      return toast.error("Passwords do not match!");
    } else if (
      username === "" ||
      password === "" ||
      password2 === "" ||
      email === ""
    ) {
      return toast.error("Field(s) should not be empty!");
    }
    const userData = { username, password, password2, email };

    onRegisterUser(userData);
  };

  const onRegisterUser = async (userData) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5000/campgrounds/register",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Error registering user");
      }

      if (response.ok) {
        setIsLoading(false);
        navigate("/campgrounds/login");
      }
    } catch (error) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };
  return (
    <>
      <section className="heading">
        <div className="top">
          <h1>
            <FaUser />
          </h1>
          <p>Please create an account</p>
        </div>

        <section className="form">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                placeholder="Enter your name"
                onChange={onChange}
              />
            </div>
            {/* email */}
            <div className="form-group">
              <input
                type="email"
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
              <input
                type="password"
                className="form-control"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-block">
                {isLoading ? (
                  <ThreeDots color="#FFF" height={40} width={40} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </section>
        {/* Sign In */}
        <div className="form-auth-action">
          <p>Already have an account?</p>
          <Link to="/campgrounds/login">Login</Link>
        </div>
      </section>
    </>
  );
};

export default Register;
