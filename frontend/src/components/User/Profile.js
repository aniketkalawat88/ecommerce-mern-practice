import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.user);

  // console.log(items?.success,"dfghjk")
  useEffect(() => {
    if (!items?.success) {
      navigate("/login");
    }
  }, [items?.success, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${items?.user?.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={items?.user?.avatar.url} alt={items?.user?.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{items?.user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{items?.user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(items?.user?.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
