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

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, items } = useSelector((state) => state.user);
  // console.log(items.success,"234567")

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    dispatch(loadUser());
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
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
