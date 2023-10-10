import styles from "./styles.module.scss";

function CartCheckout({ subTotal, shipppingFee, total, selectedItems }) {
  return (
    <div className={`${styles.cart__checkout} ${styles.card}`}>
      <h2>Order Summary</h2>
      <div className={styles.cart__checkout_line}>
        <span>Subtotal</span>
        <span>USD {subTotal}$</span>
      </div>
      <div className={styles.cart__checkout_line}>
        <span>Shipping</span>
        <span>+{shipppingFee}$</span>
      </div>
      <div className={styles.cart__checkout_total}>
        <span>Total</span>
        <span>USD {total}$</span>
      </div>
      <div className={styles.submit}>
        <button
          disabled={!selectedItems.length}
          style={{
            background: `${!selectedItems.length ? "#eee" : ""}`,
            cursor: `${!selectedItems.length ? "not-allowed" : ""}`,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CartCheckout;
