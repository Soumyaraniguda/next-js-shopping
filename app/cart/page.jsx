"use client";

import CartHeader from "@/components/cart/CartHeader";
import EmptyCart from "@/components/cart/empty/EmptyCart";
import Footer from "@/components/footer/page";
import styles from "@/styles/cart.module.scss";

function Cart() {
  const cart = [];
  return (
    <>
      <CartHeader />
      <div className={styles.cart}>
        {cart.length > 1 ? (
          <div className={styles.cart__container}></div>
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
