import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ element: Component }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading) {
    return <div><Loader /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return Component;
};

export default ProtectedRoute;




// import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'
// import { Route, useNavigate } from 'react-router-dom'

// const ProtectedRoute = ({element: Element , ...rest}) => {
//   const navigate = useNavigate();
//   const {loading , isAuthenticated } = useSelector((state) => state.user)
//   return (
//     <Fragment>
//       {!loading && (
//         <Route {...rest} render={(props) => {
//           if(!isAuthenticated){
//             return navigate("/login")
//           }
//           return <Element {...props} />
//         }} />
//       )

//       }
//     </Fragment>
//   )
// }

// export default ProtectedRoute