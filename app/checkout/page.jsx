"use client";

import styles from "@/styles/checkout.module.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart } from "@/uiApiRequests/user.api";
import CartHeader from "@/components/cart/header/CartHeader";
import Shipping from "@/components/checkout/shipping/Shipping";
import ProductsAtCheckout from "@/components/checkout/products/ProductsAtCheckout";
import Payment from "@/components/footer/Payment";
import PaymentAtCheckout from "@/components/checkout/payment/PaymentAtCheckout";

function Checkout() {
  const { data: session } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [checkoutData, setCheckoutData] = useState({ cart: {}, user: {} });
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (session) {
      getCart(session.user.id)
        .then((res) => {
          setCheckoutData(res.data);
          console.log("cart =", res.data);
          setAddresses(res.data.user?.address);
        })
        .catch((error) => {
          router.push("/cart");
        });
    }
  }, [session]);

  return (
    <>
      <CartHeader />
      <div className={`${styles.container} ${styles.checkout}`}>
        <div className={styles.checkout__side}>
          <Shipping
            user={checkoutData.user}
            addresses={addresses}
            setAddresses={setAddresses}
          />
          <ProductsAtCheckout cart={checkoutData?.cart} />
        </div>
        <div className={styles.checkout__side}>
          <PaymentAtCheckout
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
      </div>
    </>
  );
}

export default Checkout;
