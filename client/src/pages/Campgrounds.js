import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CampgroundItem from "../components/CampgroundItem";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";

const Campgrounds = () => {
  const [campgroundsData, setCampgroundsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate("/campgrounds/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const getCampgrounds = async () => {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/campgrounds");
      const data = await res.json();
      setCampgroundsData(data);
      setIsLoading(false);
    };
    getCampgrounds();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <h2>Campgrounds Collection</h2>
      <div className="camps">
        {campgroundsData.map((campground) => (
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
