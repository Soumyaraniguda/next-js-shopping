import { useState } from "react";
import styles from "./styles.module.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ShippingInput from "@/components/inputs/shippingAddressInput/ShipppingAddressInput";

function SummaryAtCheckout({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress,
}) {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Please enter a coupon first!"),
  });

  const handleApplyCoupon = async () => {};

  const handlePlaceOrder = async () => {};

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
              <button type="submit">Apply</button>
              <div className={styles.infos}>
                <span>
                  Total: <b>{cart.cartTotal}$</b>
                </span>
                {discount > 0 ? (
                  <span className={styles.discount}>
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
    </div>
  );
}

export default SummaryAtCheckout;
