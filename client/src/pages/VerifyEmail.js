import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [tokenInput, setTokenInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const userInfo = {
      userId,
      otp: tokenInput,
    };

    try {
      setIsLoading(true);
      const res = await fetch(
        "http://localhost:5000/campgrounds/verify-email",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(userInfo),
        }
      );

      if (!res.ok) {
        throw new Error("Error verifying user, please try registering again");
      }

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setIsLoading(false);
        toast.success("Email successfully verified");
        localStorage.removeItem("userId");
        navigate("/campgrounds/login");
      }
    } catch (error) {
      setIsLoading(false);
      return toast.error(error.message);
    }
  };
  return (
    <div>
      <section className="heading">
        <h2 className="verifyHeading">
          Welcome to Campgrounds! Please enter your verification token to
          continue
        </h2>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="number"
              placeholder="Provide 4-digit number"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
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
    </div>
  );
};

export default VerifyEmail;
