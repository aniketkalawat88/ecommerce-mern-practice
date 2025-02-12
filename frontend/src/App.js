import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/actions/userActions.js";
import UserOptions from "./components/layout/Header/UserOptions.js";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment.js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/admin/Dashboard.js";
import ProductList from "./components/admin/ProductList.js";
import NewProduct from "./components/admin/NewProduct.js";
import UpdateProduct from "./components/admin/UpdateProduct.js";
import OrderList from "./components/admin/OrderList.js";
import ProcessOrder from "./components/admin/ProcessOrder.js";
import UserList from "./components/admin/UserList.js";
import UpdateUser from "./components/admin/UpdateUser.js";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, items } = useSelector((state) => state.user);
  // console.log(items.success,"234567")
  // const [stripeApiKey , setStripeApiKey] = useState("")
  async function getStripeApiKey(){
    // const response = await fetch("http://localhost:4000/api/v1/stripeapikey", {
    //   method: "GET",
    //   credentials: "include", // Include cookies in the request
    // });
    // console.log(response,"cvbhjk")
    // setStripeApiKey(data.setStripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
    getStripeApiKey()
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      {isAuthenticated && <UserOptions user={items} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        {/* <Route path="/account" element={<Profile />} /> */}
        {/* <ProtectedRoute path="/account" element={<Profile />} /> */}
        <Route
          path="/account"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute element={<UpdateProfile />} />}
        />

        <Route path="/password/update" element={<UpdatePassword />} />
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />

        {/* <Element stripe={loadUser()}> */}
          <Route path="/process/payment" element={<Payment />} />

        {/* </Element> */}
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
