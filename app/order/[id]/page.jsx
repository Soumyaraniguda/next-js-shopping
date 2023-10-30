"use client";

import Header from "@/components/header/Header";
import styles from "@/styles/order.module.scss";
import { getOrderDetails } from "@/uiApiRequests/user.api";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import { IoArrowForward } from "react-icons/io5";

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

function Order({ params }) {
  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();
  const [{ loading, error, success }, reducerDispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  const orderId = params.id;
  const [orderDetails, setOrderDetails] = useState();

  function handleCreatePaypalPaymentOrder() {}

  function handlePaypalPaymentApprove() {}

  function handlePaypalPaymentError() {}

  useEffect(() => {
    if (!orderDetails?._id || success) {
      reducerDispatch({ type: "PAYMENT_RESET" });
    } else {
      // const payPalClientId = getPaypalKeys().id;
      // payPalDispatch({
      //   type: "resetOptions",
      //   value: {
      //     "client-id": payPalClientId,
      //     currency: "usd",
      //   },
      // });
      // To make it pending as we are not doing anything and put it on pending mode until payment is in action
      payPalDispatch({
        type: "setLoadingStatus",
        value: "pending",
      });
    }
  }, [orderDetails, success]);

  // Get order details
  useEffect(() => {
    if (orderId) {
      getOrderDetails(orderId)
        .then((res) => {
          setOrderDetails(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [orderId]);

  return (
    <div>
      <Header />
      <div className={styles.order}>
        {orderDetails ? (
          <div className={styles.container}>
            <div className={styles.order__infos}>
              <div className={styles.order__header}>
                <div className={styles.order__header_head}>
                  Home <IoArrowForward /> Orders <IoArrowForward /> ID {orderId}
                </div>

                <div className={styles.order__header_status}>
                  Payment Status:
                  {orderDetails?.isPaid ? (
                    <Image
                      src="/images/payment/verified.png"
                      height={30}
                      width={30}
                      alt="Paid"
                    />
                  ) : (
                    <Image
                      src="/images/payment/unverified.png"
                      height={30}
                      width={30}
                      alt="Paid"
                    />
                  )}
                </div>

                <div className={styles.order__header_status}>
                  Order Status:{" "}
                  <span
                    className={
                      orderDetails.status === "Not Processed"
                        ? styles.not_processed
                        : orderDetails.status === "Processing"
                        ? styles.processing
                        : orderDetails.status === "Dispatched"
                        ? styles.dispatched
                        : orderDetails.status === "Cancelled"
                        ? styles.cancelled
                        : orderDetails.status === "Completed"
                        ? styles.completed
                        : ""
                    }
                  >
                    {orderDetails.status}
                  </span>
                </div>
              </div>

              <div className={styles.order__products}>
                {orderDetails.products.map((product) => (
                  <div className={styles.product} key={product._id}>
                    <div className={styles.product__img}>
                      <Image
                        src={product.image}
                        height={0}
                        width={0}
                        sizes="100vw"
                        alt={product.name}
                      />
                    </div>
                    <div className={styles.product__infos}>
                      <h1 className={styles.product__infos_name}>
                        {product.name.length > 30
                          ? `${product.name.substring(0, 30)}...`
                          : product.name}
                      </h1>
                      <div className={styles.product__infos_style}>
                        <Image
                          src={product.color.image}
                          alt=""
                          height={0}
                          width={0}
                          sizes="100vw"
                        />{" "}
                        / {product.size}
                      </div>
                      <div className={styles.product__infos_priceQty}>
                        {product.price}$ x {product.qty}
                      </div>
                      <div className={styles.product__infos_total}>
                        {product.price * product.qty}$
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.order__products_total}>
                  {orderDetails.couponApplied ? (
                    <>
                      <div className={styles.order__products_total_sub}>
                        <span>Subtotal</span>
                        <span>{orderDetails.totalCostBeforeDiscount}$</span>
                      </div>
                      <div className={styles.order__products_total_sub}>
                        <span>
                          Coupon Applied <em>({orderDetails.couponApplied})</em>{" "}
                        </span>
                        <span>
                          -
                          {(
                            orderDetails.totalCostBeforeDiscount -
                            orderDetails.totalCost
                          ).toFixed(2)}
                          $
                        </span>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className={styles.order__products_total_sub}>
                    <span>Tax price</span>
                    <span>+{orderDetails.taxPrice}$</span>
                  </div>
                  <div
                    className={`${styles.order__products_total_sub} ${styles.bordertop}`}
                  >
                    <span>TOTAL TO PAY</span>
                    <b>{orderDetails.totalCost}$</b>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.order__actions}>
              <div className={styles.order__address}>
                <h1>Customer's Order</h1>
                <div className={styles.order__address_user}>
                  <div className={styles.order__address_user_infos}>
                    <Image
                      src={orderDetails.user.image}
                      height={0}
                      width={0}
                      alt=""
                      sizes="100vw"
                    />
                    <div>
                      <span>{orderDetails.user.name}</span>
                      <span>{orderDetails.user.email}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.order__address_shipping}>
                  <h2>Shipping Address</h2>
                  <span>
                    {orderDetails.shippingAddress.firstName}{" "}
                    {orderDetails.shippingAddress.lastName}
                  </span>
                  <span>{orderDetails.shippingAddress.address1}</span>
                  <span>{orderDetails.shippingAddress.address2}</span>
                  <span>{orderDetails.shippingAddress.state}</span>
                  <span>{orderDetails.shippingAddress.city}</span>
                  <span>{orderDetails.shippingAddress.zipCode}</span>
                  <span>{orderDetails.shippingAddress.country}</span>
                </div>

                <div className={styles.order__address_shipping}>
                  <h2>Billing Address</h2>
                  <span>
                    {orderDetails.shippingAddress.firstName}{" "}
                    {orderDetails.shippingAddress.lastName}
                  </span>
                  <span>{orderDetails.shippingAddress.address1}</span>
                  <span>{orderDetails.shippingAddress.address2}</span>
                  <span>{orderDetails.shippingAddress.state}</span>
                  <span>{orderDetails.shippingAddress.city}</span>
                  <span>{orderDetails.shippingAddress.zipCode}</span>
                  <span>{orderDetails.shippingAddress.country}</span>
                </div>
              </div>

              <div className={styles.order__payment}>
                {orderDetails.paymentMethod === "paypal" && (
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
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Order;
