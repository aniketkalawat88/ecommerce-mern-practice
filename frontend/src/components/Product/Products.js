import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { getProducts } from "../../Redux/actions/productActions";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@mui/material";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category , setCategory] = useState("");
  const [ratings , setRatings] = useState(0)

  const { items, loading, error, filteredProductsCount } = useSelector(
    (state) => state.products
  );
  const keyword = id;

  // console.log(items);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      console.log("product detail page error", error);
      return alert(error);
    }
    dispatch(getProducts({ keyword, currentPage, price , category ,ratings}));
  }, [dispatch, error, keyword, currentPage, price , category , ratings]);

  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products Ecommerce" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {items.products &&
              items.products.map((ele) => (
                <ProductCard key={ele._id} product={ele} />
              ))}
          </div>
          <div className="filterBox">
            <div>Price</div>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <div>Categories</div>
            <ul className="categoryBox">
              {
                categories.map((category) => (
                  <li className="category-link" key={category} onClick={() => setCategory(category)}>
                    {category}
                  </li>
                ))
              }

            </ul>
            <fieldset>
              <div component="legend">Ratings Above</div>
              <Slider
              value={ratings}
              onChange={(e , newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
              />
              
            </fieldset>
          </div>

          {items.resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={items.resultPerPage}
                totalItemsCount={items.productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
