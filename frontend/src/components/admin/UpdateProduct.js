import React, { Fragment, useEffect, useState } from "react";
import "./newproduct.css";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import { Button } from "@mui/material";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  updateProduct,
} from "../../Redux/actions/productActions";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { items } = useSelector((state) => state.productDetails);
  console.log(items, "ertyuio");

  const { loading, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  useEffect(() => {
    if (!items || items._id !== id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, items]);

  useEffect(() => {
    if (items && items._id === id) {
      // Ensure we have the correct product
      setName(items.name || "");
      setDescription(items.description || "");
      setPrice(items.price || 0);
      setCategory(items.category || "");
      setStock(items.Stock || 0);
      setOldImages(items.images || []);
    }
  }, [items, id]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = {
      name,
      price: Number(price), // Ensure it's a number
      description,
      category,
      Stock: Number(Stock), // Ensure it's a number
      images,
    };

    dispatch(updateProduct({ id, myForm }));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                value={Stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;

// useEffect(() => {
//   if(items && items._id !== id){
//     dispatch(getProductDetails(id))
//   }
//   else{
//     setName(items.name );
//     setDescription(items.description);
//     setPrice(items.price);
//     setCategory(items.category);
//     setStock(items.Stock);
//     setOldImages(items.images);
//   }

//   if(success){
//       // navigate("/admin/products")
//       console.log("Created Succesfully")
//   }
// },[success, navigate, items, id, dispatch])
