"use client";

import styles from "@/styles/checkout.module.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart } from "@/uiApiRequests/user.api";
import CartHeader from "@/components/cart/header/CartHeader";
import Shipping from "@/components/checkout/shipping/Shipping";
import ProductsAtCheckout from "@/components/checkout/products/ProductsAtCheckout";
import PaymentAtCheckout from "@/components/checkout/payment/PaymentAtCheckout";
import { paymentMethods } from "@/data/paymentMethods";
import SummaryAtCheckout from "@/components/checkout/summary/SummaryAtCheckout";

function Checkout() {
  const { data: session } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [checkoutData, setCheckoutData] = useState({ cart: {}, user: {} });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");

  // Set selected address
  useEffect(() => {
    if (addresses?.length) {
      let activeAddress = addresses?.find((address) => address.active);
      if (activeAddress) {
        setSelectedAddress(activeAddress);
      } else setSelectedAddress("");
    }
  }, [addresses]);

  // Fetch the cart details
  useEffect(() => {
    if (session) {
      getCart(session.user.id)
        .then((res) => {
          setCheckoutData(res.data);
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
            paymentMethods={paymentMethods}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
          <SummaryAtCheckout
            totalAfterDiscount={totalAfterDiscount}
            setTotalAfterDiscount={setTotalAfterDiscount}
            user={session?.user}
            cart={checkoutData?.cart}
            paymentMethod={selectedPaymentMethod}
            selectedAddress={selectedAddress}
          />
        </div>
      </div>
    </>
  );
}

export default Checkout;
