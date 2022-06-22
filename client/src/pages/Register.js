import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  // const [isLoading, setIsLoading] = useState(false);
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
    const userData = { username, password, email };

    onRegisterUser(userData);
  };

  const onRegisterUser = async (userData) => {
    try {
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
        navigate("/campgrounds/login");
      }
    } catch (error) {
      toast.error(error.message);
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
          <form onSubmit={onSubmit}>
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
                Submit
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default Register;
