import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useDeleteCamp from "../hooks/useDeleteCamp";
import CampReviews from "../components/CampReviews";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const CampShow = () => {
  const params = useParams();
  const { id } = params;
  const [showCampground, setShowCampground] = useState([]);
  const [campReview, setCampReview] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 1,
    message: "",
  });
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const { deleteCamp, isOk, isError, errorMsg } = useDeleteCamp(
    `http://localhost:5000/campgrounds/${id}`,
    token
  );

  useEffect(() => {
    const getCampground = async () => {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/campgrounds/${id}`);
      const data = await res.json();
      setShowCampground(data);
      setIsLoading(false);
    };

    getCampground();
  }, [id]);

  // use loading spinner if loading
  if (isLoading) {
    return <Loading />;
  }

  const onDeleteCampground = () => {
    deleteCamp();

    if (isOk) {
      navigate("/campgrounds");
    }

    if (isError) {
      toast.error(errorMsg);
    }
  };

  const { title, description, location, image, price, reviews } =
    showCampground;

  // campground reviews
  const { rating, message } = reviewData;
  const onChange = (e) => {
    setReviewData((prevReviews) => ({
      ...prevReviews,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (message === "") {
      setError(true);
    }
    const campReview = { ...reviewData };
    onCreateReview(campReview);
  };

  // reviews creator
  const onCreateReview = async (campReview) => {
    try {
      const res = await fetch(
        `http://localhost:5000/campgrounds/${id}/reviews`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: JSON.stringify(campReview),
        }
      );

      if (res.status === 401) {
        throw new Error("Sorry, you must be signed in to create reviews");
      }
      const data = await res.json();
      if (data) {
        setCampReview(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Delete Reviews
  const onDeleteReview = async (reviewId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/campgrounds/${id}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        }
      );

      if (res.status === 401) {
        throw new Error("Sorry, you cannot delete other people's camp reviews");
      }

      if (res.ok) {
        navigate(`/campgrounds/${id}`);
      }
      console.log(res);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="container campShow">
      <h1 className="campShow_title">{title}</h1>
      <img src={image} alt={title} />
      <div className="campShow_info">
        <p>${price}</p>
        <p>{description}</p>
        <h4>{location}</h4>
      </div>
      <div className="campShow_actions">
        <button className="campgroundItem_btn">
          <Link to={`/campgrounds/${id}/edit`}>Edit {title}</Link>
        </button>

        <button
          className="campgroundItem_btn btn-red"
          onClick={onDeleteCampground}
        >
          Delete {title}
        </button>
      </div>
      {/* reviews */}
      <div className="campShow_reviews">
        <h2>Leave a review</h2>
        <form className="campShow_review_form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="range"
              name="rating"
              id="rating"
              min={1}
              max={5}
              value={rating}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="3"
              value={message}
              onChange={onChange}
            ></textarea>
            {error && <p className={error && "error"}>Please leave a review</p>}
          </div>
          <button className="campgroundItem_btn btn-green" type="submit">
            Submit
          </button>
        </form>
      </div>
      {/* showing reviews */}
      <div className="campShow_showReviews">
        {reviews && (
          <CampReviews
            reviews={reviews}
            deleteReviewFunction={onDeleteReview}
            campReview={campReview}
          />
        )}
      </div>
    </div>
  );
};

export default CampShow;
