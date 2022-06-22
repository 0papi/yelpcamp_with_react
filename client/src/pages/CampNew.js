import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const CampNew = () => {
  const [campgroundData, setCampgroundData] = useState({
    title: "",
    image: "",
    description: "",
    location: "",
    price: 0,
  });

  const navigate = useNavigate();

  const { title, image, description, location, price } = campgroundData;

  const onChange = (e) => {
    setCampgroundData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const campData = { ...campgroundData };
    onCreateCampground(campData);
  };

  const onCreateCampground = async (campData) => {
    try {
      const res = await fetch("http://localhost:5000/campgrounds/new", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(campData),
      });

      const data = await res.json();
      console.log(data);
      navigate("/campgrounds");
    } catch (error) {
      console.log(error.message);
      navigate("/campgrounds/register");
    }
  };

  return (
    <div className="container">
      <div className="newCamp_header">
        <FaPlus />
        <h2>Create a new campground</h2>
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
          Add Campground
        </button>
      </form>
    </div>
  );
};

export default CampNew;
