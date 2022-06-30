import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CampgroundItem from "../components/CampgroundItem";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";
import useFetchCamps from "../hooks/useFetchCamps";

const Campgrounds = () => {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate("/campgrounds/login");
    }
  }, [token, navigate]);

  const { data, isLoading, error } = useFetchCamps(
    "http://localhost:5000/campgrounds"
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="container">
      <h2>Campgrounds Collection</h2>
      <div className="camps">
        {data &&
          data.map((campground) => (
            <CampgroundItem
              key={campground._id}
              id={campground._id}
              title={campground.title}
              price={campground.price}
              location={campground.location}
              description={campground.description}
              image={campground.image}
            />
          ))}
      </div>
    </div>
  );
};

export default Campgrounds;
