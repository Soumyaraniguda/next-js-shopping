import styles from "./page.module.scss";
import Image from "next/image";

function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCEPT </h3>
      <div className={styles.footer_flexwrap}>
        <Image
          alt="Visa payment"
          src="/images/payment/visa.webp"
          height={70}
          width={40}
        />

        <Image
          alt="Mastercard payment"
          src="/images/payment/mastercard.webp"
          height={70}
          width={40}
        />

        <Image
          alt="Paypal payment"
          src="/images/payment/paypal.webp"
          height={70}
          width={40}
        />
      </div>
    </div>
  );
}

export default Payment;
