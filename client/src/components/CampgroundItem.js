import { Link } from "react-router-dom";

const CampgroundItem = ({ title, image, description, location, id }) => {
  return (
    <>
      <div className="campgroundItem">
        <div className="campgroundItem_img">
          <img src={image} alt={title} />
        </div>
        <div className="campgroundItem_info">
          <h4>{location}</h4>
          <p>{description}</p>
          <button className="campgroundItem_btn">
            <Link to={`/campgrounds/${id}`}>{title}</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default CampgroundItem;
