import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ShippingInput from "@/components/inputs/shippingAddressInput/ShipppingAddressInput";
import { applyCoupon, placeOrder } from "@/uiApiRequests/user.api";
import { useRouter } from "next/navigation";

function SummaryAtCheckout({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress,
}) {
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [applyCouponError, setApplyCouponError] = useState("");
  const [orderError, setOrderError] = useState("");
  const router = useRouter();

  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Please enter a coupon first!"),
  });

  const handleApplyCoupon = async () => {
    setApplyCouponError("");
    setAppliedCoupon("");
    const res = await applyCoupon(coupon);
    if (res.status === 200) {
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setDiscount(res.data.discount);
      setAppliedCoupon(coupon);
    } else {
      setApplyCouponError(res.data.message);
    }
    setCoupon("");
  };

  const handlePlaceOrder = async () => {
    setOrderError("");
    if (!paymentMethod) {
      setOrderError("Please choose a payment method.");
      return;
    } else if (!selectedAddress) {
      setOrderError("Please select shipping address.");
      return;
    }
    const res = await placeOrder({
      products: cart.products,
      shippingAddress: selectedAddress,
      paymentMethod,
      totalCost:
        totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
      totalCostBeforeDiscount: cart.cartTotal,
      couponApplied: appliedCoupon,
    });

    if (res.status === 200) {
      router.push(`/order/${res.data.order_id}`);
    } else {
      setOrderError(res.data.message);
    }
  };

  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>Order Summary</h3>
      </div>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={() => {
            handleApplyCoupon();
          }}
        >
          {(formik) => (
            <Form>
              <ShippingInput
                name="coupon"
                placeholder="*Coupon"
                onChange={(e) => setCoupon(e.target.value)}
              />
              {applyCouponError ? (
                <span className={styles.error}>{applyCouponError}</span>
              ) : (
                <></>
              )}
              <button type="submit">Apply</button>
              <div className={styles.infos}>
                <span>
                  Total: <b>{cart.cartTotal}$</b>
                </span>
                {discount > 0 ? (
                  <span className={styles.coupon_span}>
                    Coupon applied: <b>-{discount}%</b>
                  </span>
                ) : (
                  <></>
                )}
                {totalAfterDiscount && totalAfterDiscount < cart.cartTotal ? (
                  <span>
                    New price: <b>{totalAfterDiscount}$</b>
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <button className={styles.submit_btn} onClick={() => handlePlaceOrder()}>
        Place Order
      </button>
      {orderError ? <span className={styles.error}>{orderError}</span> : <></>}
    </div>
  );
}

export default SummaryAtCheckout;
