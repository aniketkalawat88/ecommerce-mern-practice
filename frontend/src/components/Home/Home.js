import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/actions/productActions";
import Loader from "../layout/Loader/Loader";

// const product = {
//   name: "Blue sjsd",
//   images: "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
//   price: "3000",
//   _id: "aniket",
// };
const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  console.log("items ", items);
  useEffect(() => {
    if (error) {
      console.log(error);
      return alert(error);
    }
    dispatch(getProducts(""));
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {items.products &&
              items.products.map((product, i) => (
                <div key={i}>
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Home;
