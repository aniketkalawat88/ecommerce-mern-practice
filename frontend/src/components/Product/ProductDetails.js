import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { getProductDetails } from "../../Redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import ReactStars from "react-rating-stars-component";
import { addItemsToCart } from "../../Redux/actions/cartAction";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, items } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);

  const options = {
    size: "large",
    value: items?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (items?.stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart({ id, quantity }));
    alert("Item Added To Cart");
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            {/* Product Image Carousel */}
            <div>
              <Carousel>
                {items?.images &&
                  items.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            {/* Product Details */}
            <div>
              {/* Product Name and ID */}
              <div className="detailsBlock-1">
                <h2>{items?.name}</h2>
                <p>Product # {items?._id}</p>
              </div>

              {/* Ratings and Reviews */}
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  ({items?.numOfReviews || 0} Reviews)
                </span>
              </div>

              {/* Price and Quantity */}
              <div className="detailsBlock-3">
                <h1>{`₹${items?.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={items?.stock < 1}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Stock Status */}
                <p>
                  Status:{" "}
                  <b
                    className={
                      items?.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {items?.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              {/* Description */}
              <div className="detailsBlock-4">
                Description: <p>{items?.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          {/* Reviews Section */}
          <h3 className="reviewsHeading">REVIEWS</h3>
          {items?.reviews && items.reviews[0] ? (
            <div className="reviews">
              {items.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;






// import React, { Fragment, useEffect, useState } from "react";
// import Carousal from "react-material-ui-carousel";
// import "./ProductDetails.css";
// import { getProductDetails } from "../../Redux/actions/productActions";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import ReviewCard from "./ReviewCard";
// import Loader from "../layout/Loader/Loader";
// import ReactStars from "react-rating-stars-component";
// import { addItemsToCart } from "../../Redux/actions/cartAction";
// // import { Rating } from "@material-ui/lab";

// const ProductDetails = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const { loading, items, error } = useSelector(
//     (state) => state.productDetails
//   );
//   // console.log(items ,"vghihuj")

//   const options = {
//     size: "large",
//     value: items.ratings ,
//     readOnly: true,
//     precision: 0.5,
//   };

//   const [quantity , setQuantity] = useState(1);

//   const increaseQuantity = () => {
//     if(items?.stock <= quantity) return ;
//     const qut = quantity +1;
//     setQuantity(qut)
//   }

//   const decreaseQuantity = () => {
//     if(1 >= quantity) return ;
//     const qut = quantity - 1;
//     setQuantity(qut)
//   }

//   const addToCartHandler = () => {
//     // console.log(id , quantity)
//     dispatch(addItemsToCart({id, quantity}));
//     alert("Item Added To Cart");
//   };

//   //   console.log(items.product);
//   useEffect(() => {
//     // if (error) {
//     //   console.log(error, "error hai");
//     //   return alert(error);
//     // }
//     dispatch(getProductDetails(id));
//   }, [dispatch, id, error]);
//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <div className="ProductDetails">
//             <div>
//               <Carousal>
//                 {items.images &&
//                   items.images.map((item, i) => (
//                     <img
//                       className="CarouselImage"
//                       key={item.url}
//                       src={item.url}
//                       alt={`${i} Slide`}
//                     />
//                   ))}
//               </Carousal>
//             </div>
//             <div>
//               <div className="detailsBlock-1">
//                 <h2>{items.name}</h2>
//                 <p>Product # {items._id}</p>
//               </div>
//               <div className="detailsBlock-2">
//                 <ReactStars {...options} /> 
//                 <span className="detailsBlock-2-span">
//                   {" "}
//                   ({items.numOfReviews} Reviews)
//                 </span>
//               </div>
//               <div className="detailsBlock-3">
//                 <h1>{`₹${items.price}`}</h1>
//                 <div className="detailsBlock-3-1">
//                   <div className="detailsBlock-3-1-1">
//                     <button onClick={decreaseQuantity}>-</button>
//                     <input readOnly type="number" value={quantity} />
//                     <button onClick={increaseQuantity}>+</button>
//                   </div>
//                   <button
//                     disabled={items.Stock < 1 ? true : false}
//                     onClick={addToCartHandler({id , quantity})}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>

//                 <p>
//                   Status:
//                   <b className={items.Stock < 1 ? "redColor" : "greenColor"}>
//                     {items.Stock < 1 ? "OutOfStock" : "InStock"}
//                   </b>
//                 </p>
//               </div>

//               <div className="detailsBlock-4">
//                 Description : <p>{items.description}</p>
//               </div>

//               <button className="submitReview">Submit Review</button>
//             </div>
//           </div>

//           <h3 className="reviewsHeading">REVIEWS</h3>

//           {items.reviews && items.reviews[0] ? (
//             <div className="reviews">
//               {items.reviews &&
//                 items.reviews.map((review) => (
//                   <ReviewCard key={review._id} review={review} />
//                 ))}
//             </div>
//           ) : (
//             <p className="noReviews">No Reviews Yet</p>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default ProductDetails;
