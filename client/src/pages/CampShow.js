import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CampReviews from "../components/CampReviews";
import Loading from "../components/Loading";

const CampShow = () => {
  const params = useParams();
  const { id } = params;
  const [showCampground, setShowCampground] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 1,
    message: "",
  });
  const navigate = useNavigate();

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

  const onDeleteCampground = async () => {
    const res = await fetch(`http://localhost:5000/campgrounds/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    navigate("/campgrounds");
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
    window.location.reload();
  };

  // reviews creator
  const onCreateReview = async (campReview) => {
    const res = await fetch(`http://localhost:5000/campgrounds/${id}/reviews`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(campReview),
    });

    const data = await res.json();
    console.log(data);
  };
  // Delete Reviews
  const onDeleteReview = async (reviewId) => {
    const res = await fetch(
      `http://localhost:5000/campgrounds/${id}/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    console.log(res);
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
            {error && (
              <p className={error && "error"}>
                Please reviews cannot be empty. Type something!
              </p>
            )}
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
          />
        )}
      </div>
    </div>
  );
};

export default CampShow;
