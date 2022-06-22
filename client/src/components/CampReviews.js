import { FaTrash } from "react-icons/fa";

const CampReviews = ({ reviews, deleteReviewFunction }) => {
  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id} className="reviews_main">
          <div>
            <h2>Rating: {review.rating}</h2>
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
