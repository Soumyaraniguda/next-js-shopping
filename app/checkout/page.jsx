"use client";

import styles from "@/styles/checkout.module.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart } from "@/uiApiRequests/user.api";
import CartHeader from "@/components/cart/header/CartHeader";
import Shipping from "@/components/checkout/shipping/Shipping";

function Checkout() {
  const { data: session } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [checkoutData, setCheckoutData] = useState({ cart: {}, user: {} });

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
        </div>
        <div className={styles.checkout__side}></div>
      </div>
    </>
  );
}

export default Checkout;
