import React from "react";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
// import { Typography } from "@material-ui/core";
// import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import { addItemsToCart } from "../../Redux/actions/cartAction";
import { removeCartItem } from "../../Redux/slice/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;

    dispatch(addItemsToCart({ id, quantity: newQty }));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty < 1) return;

    dispatch(addItemsToCart({ id, quantity: newQty }));
  };

  const deleteCartItems = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div className="cartPage">
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          {/* <RemoveShoppingCartIcon /> */}
          <div>No items in your cart</div>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <div>
          <div className="cartHeader">
            <div>Cart</div>
          </div>
          {cartItems.map((item) => (
            <div key={item.product} className="cartContainer">
              <CartItemCard item={item} deleteCartItems={deleteCartItems} />
              <div className="cartInput">
                <button
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                >
                  -
                </button>
                <input type="number" readOnly value={item.quantity} />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`₹${
                item.price * item.quantity
              }`}</p>
            </div>
          ))}
          <div className="cartGrossProfit">
            <div></div>
          <div className="cartGrossProfitBox">
            <div>{`Total: ₹${cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}`}</div>
          </div>
          <div></div>
            <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
