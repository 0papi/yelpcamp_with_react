import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <h2>Welcome to YelpCamp</h2>
      <p>
        Jump right in and explore our impressive collection of campgrounds! Feel
        free to share some of your own and comment on others!
      </p>
      <Link to="/campgrounds">
        <button className="campgroundItem_btn btn_white">
          View Campground
        </button>
      </Link>
    </div>
  );
};

export default Home;
