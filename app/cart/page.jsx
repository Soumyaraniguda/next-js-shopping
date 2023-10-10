"use client";

import CartHeader from "@/components/cart/header/CartHeader";
import EmptyCart from "@/components/cart/empty/EmptyCart";
import ProductCart from "@/components/cart/product/ProductCart";
import Footer from "@/components/footer/page";
import styles from "@/styles/cart.module.scss";
import { useSelector } from "react-redux";
import CartSubHeader from "@/components/cart/subHeader/CartSubHeader";
import CartCheckout from "@/components/cart/checkout/CartCheckout";
import { useEffect, useState } from "react";

function Cart() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));

  const [shippingFee, setShippingFee] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const shippingFeeValue = Math.floor(
      selectedItems.reduce((a, c) => a + c.shipping || 0, 0).toFixed(2)
    );
    setShippingFee(shippingFeeValue);

    const subTotalValue = Math.floor(
      selectedItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
    );
    setSubTotal(subTotalValue);

    setTotal(shippingFeeValue + subTotalValue);
  }, [selectedItems]);

  console.log({ selectedItems, cartItems: cart.cartItems });

  return (
    <>
      <CartHeader />
      <div className={styles.cart}>
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__container}>
            <CartSubHeader
              cartItems={cart?.cartItems}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
            <div className={styles.cart__products}>
              {cart.cartItems.map((product) => (
                <ProductCart
                  product={product}
                  key={product._uid}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              ))}
            </div>
            <CartCheckout
              subTotal={subTotal}
              shipppingFee={shippingFee}
              total={total}
              selectedItems={selectedItems}
            />
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
