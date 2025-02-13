import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "./dashboard.css";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../Redux/actions/productActions";
import { getAllOrders } from "../../Redux/actions/orderAction";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const { order } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.allUsers)
  
  // console.log(order,"fghjk")
  let outOfStock = 0;

  items &&
    items?.products.forEach((item) => {
     if(item.Stock === 0){
      outOfStock += 1
     }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
  }, [dispatch]);

  let totalAmount = 0;
  order &&
    order.forEach((item) => {
      totalAmount += item.totalPrice;
    });


  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, items?.products.length - outOfStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <SideBar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br />
              ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{items?.products && items?.products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{order && order?.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users?.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
