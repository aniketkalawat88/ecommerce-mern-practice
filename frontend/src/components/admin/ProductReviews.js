import React, { Fragment, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { deleteReview, getAllReviews } from "../../Redux/actions/productActions";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import './productReviews.css'
import Sidebar from "./SideBar";
import DeleteIcon from "@mui/icons-material/Delete";


const ProductReviews = () => {
  const dispatch = useDispatch();

  const { reviews, loading } = useSelector(
    (state) => state.reviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview({ reviewId, productId }));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }


  }, [dispatch, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    { field: "comment", headerName: "Comment", minWidth: 350, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      // cellClassName: (params) =>
      //   params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor",
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => deleteReviewHandler(params.id)}
        >
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const rows = reviews.map((item) => ({
    id: item._id,
    rating: item.rating,
    comment: item.comment,
    user: item.name,
  }));

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
            <div>
              {/* <Star /> */}
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading || productId === ""}
            >
              Search
            </Button>
          </form>

          {reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
