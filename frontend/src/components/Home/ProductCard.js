import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "#5sdfs5",
    activeColor: "tomato",
    value:product.ratings
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img
        src={"https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649"}
        alt={product.name}
      />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹ ${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
