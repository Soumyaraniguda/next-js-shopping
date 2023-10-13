import Image from "next/image";
import styles from "./styles.module.scss";

function PaymentMethodsCart() {
  return (
    <div className={`${styles.card} ${styles.cart__method}`}>
      <h2 className={styles.header}>Payment methods</h2>
      <div className={styles.images}>
        <Image
          alt="Visa payment"
          src="/images/payment/visa.webp"
          height={40}
          width={55}
        />

        <Image
          alt="Mastercard payment"
          src="/images/payment/mastercard.webp"
          height={40}
          width={55}
        />

        <Image
          alt="Paypal payment"
          src="/images/payment/paypal.webp"
          height={40}
          width={55}
        />
      </div>
      <h2 className={styles.header}>Buyer Protection</h2>
      <div className={styles.protection}>
        <Image
          alt="Buyer protection"
          src="/images/protection.png"
          height={50}
          width={40}
        />
        Get full refund if the item is not as described or if it's not
        delivered.
      </div>
    </div>
  );
}

export default PaymentMethodsCart;
