import React, { Fragment, useEffect } from 'react'
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import SideBar from './SideBar';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAdminProduct } from '../../Redux/actions/productActions';
import './productlist.css'


const ProductList = () => {
  const dispatch = useDispatch();
  const {items} = useSelector((state) => state.products)
// console.log(items,"fghjk")

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
    alert("Deleted Succesfully")
  }
  useEffect(() => {
    dispatch(getAdminProduct())
  },[dispatch])

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.row.id}`}>
            <EditIcon />
          </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.row.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  
  items &&
    items?.products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />

        </div>
      </div>
    </Fragment>
  )
}

export default ProductList