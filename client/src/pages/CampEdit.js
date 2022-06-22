import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPen } from "react-icons/fa";

const CampEdit = () => {
  const [campground, setCampground] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // extract id from params
  const { id } = params;

  // fetch campground using id
  useEffect(() => {
    const getCampground = async () => {
      const res = await fetch(`http://localhost:5000/campgrounds/${id}`);
      const data = await res.json();
      setCampground(data);
    };
    getCampground();
  }, [id]);

  // destructure campground data from campground state
  const { title, image, description, location, price } = campground;

  // chain new campground data
  const onChange = (e) => {
    setCampground((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle submit of newly updated campground data by passing data to a function that handles the request to the backend
  const onSubmit = (e) => {
    e.preventDefault();
    const campData = { ...campground };
    onCreateCampground(campData);
  };

  // create function that handles put request to the backend
  const onCreateCampground = async (campData) => {
    const res = await fetch(`http://localhost:5000/campgrounds/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(campData),
    });

    const data = await res.json();
    console.log(data);
    navigate("/campgrounds");
  };

  return (
    <div className="container">
      <div className="newCamp_header">
        <FaPen />
        <h2>Edit Campground</h2>
      </div>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="camp title"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            placeholder="camp price"
            min={1}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            placeholder="camp location"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            value={image}
            placeholder="camp image"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="camp description"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="newCamp_btn">
          Update Campground
        </button>
      </form>
    </div>
  );
};

export default CampEdit;
