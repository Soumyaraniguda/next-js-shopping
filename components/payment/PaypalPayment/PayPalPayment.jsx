import { useEffect, useReducer, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { updateOrderPayWithPaypal } from "@/uiApiRequests/user.api";

function reducer(state, action) {
  switch (action.type) {
    case "PAYMENT_REQUEST":
      return { ...state, loading: true };
    case "PAYMENT_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PAYMENT_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "PAYMENT_RESET":
      return { ...state, loading: false, success: false, error: false };
  }
}

function PayPalPayment({ orderDetails }) {
  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  const [{ loading, error, success }, reducerDispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  function handleCreatePaypalPaymentOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderDetails.totalCost,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  function handlePaypalPaymentApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        reducerDispatch({ type: "PAYMENT_REQUEST" });
        const res = updateOrderPayWithPaypal({
          orderId,
          details,
        });

        console.log("data =", res.data);
        reducerDispatch({ type: "PAYMENT_SUCCESS", payload: res.data });
        window.location.reload(false);
      } catch (error) {
        reducerDispatch({ type: "PAYMENT_FAILED", payload: error });
      }
    });
  }

  function handlePaypalPaymentError(error) {
    reducerDispatch({ type: "PAYMENT_FAILED", payload: error });
  }

  useEffect(() => {
    if (!orderDetails?._id || success) {
      reducerDispatch({ type: "PAYMENT_RESET" });
    } else {
      // To make it pending as we are not doing anything and put it on pending mode until payment is in action
      payPalDispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    }
  }, [orderDetails, success]);

  return (
    <div>
      <>
        {isPending ? (
          <span>loading...</span>
        ) : (
          <PayPalButtons
            createOrder={handleCreatePaypalPaymentOrder}
            onApprove={handlePaypalPaymentApprove}
            onError={handlePaypalPaymentError}
          ></PayPalButtons>
        )}
      </>
    </div>
  );
}

export default PayPalPayment;
