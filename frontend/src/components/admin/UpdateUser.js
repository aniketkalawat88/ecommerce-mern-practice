import React, { Fragment, useEffect, useState } from 'react'
import './newproduct.css'
import MetaData from '../layout/MetaData'
import SideBar from './SideBar'
import { Button } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from '../../Redux/actions/productActions'
import { useParams } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import { getUserDetails, updateUser } from '../../Redux/actions/userActions'

const UpdateUser = () => {
    const dispatch = useDispatch();
      const { id} = useParams();
    const { loading} = useSelector((state) => state.newProduct)
    const {
        loading: updateLoading,
        // isUpdated, 
      } = useSelector((state) => state.profile);
      const { users } = useSelector((state) => state.getUser); // Make sure 'profile' contains user details
      // console.log(users)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
  

    useEffect(() => {
      dispatch(getUserDetails(id));  // Fetch the user details when component mounts
    }, [dispatch,id]);
    
    useEffect(() => {
      if (users) {
        setName(users.name);
        setEmail(users.email);
        setRole(users.role);
      }
    }, [users]);
    const updateUserSubmitHandler = (e) => {
      e.preventDefault();
      
      const myForm = {
        name: name,
        email: email,
        role: role,
      };
    
      dispatch(updateUser({ id, myForm }));
    };
    

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateUser