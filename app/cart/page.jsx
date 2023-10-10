"use client";

import CartHeader from "@/components/cart/header/CartHeader";
import EmptyCart from "@/components/cart/empty/EmptyCart";
import ProductCart from "@/components/cart/product/ProductCart";
import Footer from "@/components/footer/page";
import styles from "@/styles/cart.module.scss";
import { useSelector } from "react-redux";

function Cart() {
  const { cart } = useSelector((state) => ({ ...state }));

  return (
    <>
      <CartHeader />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <ProductCart product={product} key={product._uid} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
