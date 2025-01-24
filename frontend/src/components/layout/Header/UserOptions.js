import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import "./Header.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/actions/userActions";
import Backdrop from '@mui/material/Backdrop';


const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user?.user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard(){
    navigate("/dashboard")
  }

  function orders(){
    navigate("/orders")
  }

  function account(){
    navigate("/account")
  }

  function logoutUser(){
    // navigate("/logoutUser")
    dispatch(logout())
    alert("Logout Successfully")
  }

  // console.log(user, "fghjk");
  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11"}}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user?.user?.avatar?.public_id ? "/Profile.png" : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item , i) => (
          <SpeedDialAction
            key={i}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
