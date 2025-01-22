import React, { Fragment, useEffect } from "react";
import Carousal from "react-material-ui-carousel";
import "./ProductDetails.css";
import { getProductDetails } from "../../Redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
// import { Rating } from "@material-ui/lab";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, items, error } = useSelector(
    (state) => state.productDetails
  );

  //   const options = {
  //     size: "large",
  //     value: items.ratings,
  //     readOnly: true,
  //     precision: 0.5,
  //   };

  //   console.log(items.product);
  useEffect(() => {
    if(error){
        console.log(error , "error hai")
        return alert(error)
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id , error]);
  return (
    <Fragment>
        {loading ? <Loader />
        :
        <Fragment>
        <div className="ProductDetails">
            <div>
            <Carousal>
                {items.images &&
                items.images.map((item, i) => (
                    <img
                    className="CarouselImage"
                    key={item.url}
                    src={item.url}
                    alt={`${i} Slide`}
                    />
                ))}
            </Carousal>
            </div>
            <div>
            <div className="detailsBlock-1">
                <h2>{items.name}</h2>
                <p>Product # {items._id}</p>
            </div>
            <div className="detailsBlock-2">
                {items.ratings} Rating
                <span className="detailsBlock-2-span">
                {" "}
                ({items.numOfReviews} Reviews)
                </span>
            </div>
            <div className="detailsBlock-3">
                <h1>{`₹${items.price}`}</h1>
                <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input readOnly type="number" value={1} />
                    <button>+</button>
                </div>
                <button
                    disabled={items.Stock < 1 ? true : false}
                    // onClick={addToCartHandler}
                >
                    Add to Cart
                </button>
                </div>

                <p>
                Status:
                <b className={items.Stock < 1 ? "redColor" : "greenColor"}>
                    {items.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
                </p>
            </div>

            <div className="detailsBlock-4">
                Description : <p>{items.description}</p>
            </div>

            <button className="submitReview">Submit Review</button>
            </div>
        </div>

        <h3 className="reviewsHeading">REVIEWS</h3>

        {items.reviews && items.reviews[0] ? (
                <div className="reviews">
                {items.reviews &&
                    items.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
            ) : (
                <p className="noReviews">No Reviews Yet</p>
            )}
        </Fragment>
        }
    </Fragment>
  );
};

export default ProductDetails;
