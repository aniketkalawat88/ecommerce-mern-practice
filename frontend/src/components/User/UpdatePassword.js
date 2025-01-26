import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import "./UpdatePassword.css"
import { updatePassword } from '../../Redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, profile, loading } = useSelector((state) => state.updatePassword);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword({oldPassword , newPassword , confirmPassword}));
  };

  useEffect(() => {
    if (error) {
      return alert(error)
    }

    if (profile) {
      navigate("/account");
    }
  }, [error, profile , navigate]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Change Password" />
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Profile</h2>

            <form
              className="updatePasswordForm"
              onSubmit={updatePasswordSubmit}
            >
              <div className="loginPassword">
                {/* <VpnKeyIcon /> */}
                <input
                  type="password"
                  placeholder="Old Password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="loginPassword">
                {/* <LockOpenIcon /> */}
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                {/* <LockIcon /> */}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Change"
                className="updatePasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default UpdatePassword