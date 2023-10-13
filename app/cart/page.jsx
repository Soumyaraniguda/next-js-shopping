"use client";

import CartHeader from "@/components/cart/header/CartHeader";
import EmptyCart from "@/components/cart/empty/EmptyCart";
import ProductCart from "@/components/cart/product/ProductCart";
import Footer from "@/components/footer/page";
import styles from "@/styles/cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CartSubHeader from "@/components/cart/subHeader/CartSubHeader";
import CartCheckout from "@/components/cart/checkout/CartCheckout";
import { useEffect, useRef, useState } from "react";
import PaymentMethodsCart from "@/components/cart/paymentMethods/PaymentMethodsCart";
import ProductSwiper from "@/components/productsSwiper/ProductSwiper";
import { gamingSwiper, homeImprovSwiper, women_swiper } from "@/data/home";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { saveCart } from "@/uiApiRequests/user.api";
import { updateCart } from "@/redux/cartSlice";
import axios from "axios";

function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedItems, setSelectedItems] = useState([]);
  const { cart } = useSelector((state) => ({ ...state }));

  const [shippingFee, setShippingFee] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const shippingFeeValue = selectedItems.reduce(
      (a, c) => a + c.shipping || 0,
      0
    );

    setShippingFee(shippingFeeValue.toFixed(2));

    const subTotalValue = selectedItems.reduce(
      (a, c) => a + c.price * c.qty,
      0
    );

    setSubTotal(subTotalValue.toFixed(2));
    const totalPrice = (shippingFeeValue + subTotalValue).toFixed(2);
    setTotal(totalPrice);
  }, [selectedItems]);

  const updateCartInitiallyRef = useRef(true);
  /**
   * UPDATE THE CART REDUX STATE
   * Update the cart in the redux state as soon as you land on checkout page
   * Some times product maybe out of stock when you land on the page after a day or some time
   * So get the latest data about the products added in the cart and then show the cart items info
   * This should happen only once
   */

  useEffect(() => {
    const update = async () => {
      const { data } = await axios.post("/api/cart/update", {
        products: cart.cartItems,
      });
      dispatch(updateCart(data));
    };
    if (cart.cartItems.length && updateCartInitiallyRef.current) {
      updateCartInitiallyRef.current = false;
      update();
    }
  }, [cart.cartItems]);

  const handleSaveCartToDB = async () => {
    if (session) {
      const res = await saveCart(selectedItems, session.user.id);
      // router.push("/checkout");
    } else {
      signIn();
    }
  };

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
              onSaveCartToDB={handleSaveCartToDB}
            />
            <PaymentMethodsCart />
          </div>
        ) : (
          <EmptyCart />
        )}
        <ProductSwiper products={women_swiper} />
        <ProductSwiper products={homeImprovSwiper} />
      </div>
      <Footer />
    </>
  );
}

export default Cart;
