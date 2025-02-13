import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ImportExportIcon from "@mui/icons-material/ImportExport";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to="">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/products">
        <p>
          <PostAddIcon />
          All
        </p>
      </Link>
      <Link to="/admin/product">
        <p>
          <AddIcon /> Create
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default SideBar;
