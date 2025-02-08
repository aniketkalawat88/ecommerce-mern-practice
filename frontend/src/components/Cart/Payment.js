
import React, { Fragment, useEffect, useRef } from "react";
import "./Payment.css";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@mui/material";
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import EventIcon from '@mui/icons-material/Event';
// import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { createOrder } from "../../Redux/actions/orderAction";
import { useNavigate } from "react-router-dom";

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const navigate = useNavigate()

  const dispatch = useDispatch();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
    paymentInfo: {
      id: "manual_payment",
      status: "pending",
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      dispatch(createOrder(order));
      navigate("/success");
    } catch (error) {
      payBtn.current.disabled = false;
      alert("Order submission failed");
    }
  };

  useEffect(() => {
    if (error) {
      alert(error);
      // dispatch(clearErrors());
    }
  }, [ error]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Confirm Order</Typography>
          <input
            type="submit"
            value={`Place Order - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;



// import React, { Fragment, useRef } from "react";
// import "./Payment.css";
// import MetaData from "../layout/MetaData";
// import { useDispatch, useSelector } from "react-redux";
// import CheckoutSteps from "./CheckoutSteps";
// import { Typography } from "@mui/material";
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import EventIcon from '@mui/icons-material/Event';
// import VpnKeyIcon from '@mui/icons-material/VpnKey';
// // import {
// //   CardNumberElement,
// //   CardCvcElement,
// //   CardExpiryElement,
// //   useStripe,
// //   useElements,
// // } from "@stripe/react-stripe-js";
// // import axios from "axios";


// const Payment = () => {
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
//   // const dispatch = useDispatch();
//   // const stripe = useStripe()
//   // const element = useElements();
//   const payBtn = useRef(null);

//   const {shippingInfo, cartItems } = useSelector((state) => state.cart)
//   const { user } = useSelector((state) => state.newOrder)

  
//   const paymentData = {
//     amount: Math.round(orderInfo.totalPrice * 100),
//   };

//   const order = {
//     shippingInfo,
//     orderItems: cartItems,
//     itemsPrice: orderInfo.subtotal,
//     taxPrice: orderInfo.tax

//   }
  
  
  
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     payBtn.current.disabled = true;
//     try {
//       // const config = {
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       // };
//       // const { data } = await axios.post(
//       //   "/api/v1/payment/process",
//       //   paymentData,
//       //   config
//       // );

//       // const client_secret = data.client_secret;

//       // if (!stripe || !elements) return;

//       // const result = await stripe.confirmCardPayment(client_secret, {
//       //   payment_method: {
//       //     card: elements.getElement(CardNumberElement),
//       //     billing_details: {
//       //       name: user.name,
//       //       email: user.email,
//       //       address: {
//       //         line1: shippingInfo.address,
//       //         city: shippingInfo.city,
//       //         state: shippingInfo.state,
//       //         postal_code: shippingInfo.pinCode,
//       //         country: shippingInfo.country,
//       //       },
//       //     },
//       //   },
//       // });

//     //   if (result.error) {
//     //     payBtn.current.disabled = false;

//     //     alert.error(result.error.message);

//     // }
//   }
//     catch (error) {
//       payBtn.current.disabled = false;
//       alert(error.response.data.message);
//     }

//   }

//   return (
//     <Fragment>
//       <MetaData title="Payment" />
//       <CheckoutSteps activeStep={2} />
//       <div className="paymentContainer">
//         <form className="paymentForm" 
//         onSubmit={(e) => submitHandler(e)}
//         >
//           <Typography>Card Info</Typography>
//           <div>
//             <CreditCardIcon />
//             {/* <CardNumberElement className="paymentInput" /> */}
//             <input className="paymentInput" />
            
//           </div>
//           <div>
//             <EventIcon />
//             {/* <CardExpiryElement className="paymentInput" /> */}
//             <input className="paymentInput" />
//           </div>
//           <div>
//             <VpnKeyIcon />
//             {/* <CardCvcElement className="paymentInput" /> */}
//             <input className="paymentInput" />
//           </div>

//           <input
//             type="submit"
//             value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
//             ref={payBtn}
//             className="paymentFormBtn"
//           />
//         </form>
//       </div>
//     </Fragment>
//   );
// };

// export default Payment;
