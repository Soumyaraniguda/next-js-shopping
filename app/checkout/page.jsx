"use client";

import styles from "@/styles/checkout.module.scss";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart } from "@/uiApiRequests/user.api";
import CartHeader from "@/components/cart/header/CartHeader";
import Shipping from "@/components/checkout/shipping/Shipping";

function Checkout() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState();
  const [checkoutData, setCheckoutData] = useState({ cart: {}, user: {} });

  useEffect(() => {
    if (session) {
      getCart(session.user.id)
        .then((res) => {
          setCheckoutData(res.data);
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
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            user={checkoutData.user}
          />
        </div>
        <div className={styles.checkout__side}></div>
      </div>
    </>
  );
}

export default Checkout;
