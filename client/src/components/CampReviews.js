import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaTrash } from "react-icons/fa";

const CampReviews = ({ reviews, deleteReviewFunction, campReview }) => {
  const [showDel, setShowDel] = useState(true);

  const { userData } = useContext(AuthContext);

  console.log(userData);
  console.log(campReview);

  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id} className="reviews_main">
          <div>
            <h2>Rating: {review.rating}</h2>
            {campReview && <h2>By {campReview.author.username}</h2>}
            <p>Review: {review.message}</p>
          </div>
          <div
            className="reviews_del"
            onClick={() => deleteReviewFunction(review._id)}
          >
            <FaTrash />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampReviews;
