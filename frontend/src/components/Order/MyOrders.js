import React, { Fragment, useEffect } from 'react'
import './MyOrders.css'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { myOrder } from '../../Redux/actions/orderAction';
// import { DataGrid } from '@mui/x-data-grid';


const MyOrders = () => {
    const dispatch = useDispatch();

  const { loading , orders } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.user);
//   console.log(user,"dfghjk")

  useEffect(() => {
    // if (error) {
    //   alert(error);
    // //   dispatch(clearErrors());
    // }

    dispatch(myOrder());
  }, [dispatch]);
    
  return (
    <Fragment>
    <MetaData title={`${user?.name} - Orders`} />

    {loading ? (
      <Loader />
    ) : (
      <div className="myOrdersPage">
        <table className="myOrdersTable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Items Qty</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td className={item.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                    {item.orderStatus}
                  </td>
                  <td>{item.orderItems.length}</td>
                  <td>₹{item.totalPrice}</td>
                  <td>
                    <Link to={`/order/${item._id}`}>
                      <LaunchIcon />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
      </div>
    )}
  </Fragment>
    // <Fragment>
    //   <MetaData title={`- Orders`} />

    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     <div className="myOrdersPage">
    //       <Grid
    //         // rows={rows}
    //         // columns={columns}
    //         pageSize={10}
    //         disableSelectionOnClick
    //         className="myOrdersTable"
    //         autoHeight
    //       />

    //       <Typography id="myOrdersHeading">s Orders</Typography>
    //     </div>
    //   )}
    // </Fragment>
  )
}

export default MyOrders