import Image from "next/image";
import styles from "./styles.module.scss";

function PaymentAtCheckout({
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) {
  return (
    <div className={styles.payment}>
      <div className={styles.header}>
        <h3>Payment Method</h3>
      </div>
      {paymentMethods?.map((pm) => (
        <label
          key={pm.id}
          className={styles.payment__item}
          onClick={() => setSelectedPaymentMethod(pm.id)}
          style={{
            background: `${selectedPaymentMethod === pm.id ? "#f5f5f5" : ""} `,
          }}
        >
          <input
            type="radio"
            name="payment"
            id={pm.id}
            checked={selectedPaymentMethod === pm.id}
          />
          <Image
            src={`/images/checkout/${pm.id}.webp`}
            alt={pm.name}
            height={40}
            width={60}
          />
          <div className={styles.payment__item_col}>
            <span>Pay with {pm.name}</span>
            <p>
              {pm.images.length > 0
                ? pm.images.map((img) => (
                    <Image
                      src={`/images/payment/${img}.webp`}
                      alt={""}
                      height={30}
                      width={45}
                    />
                  ))
                : pm.description}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
}

export default PaymentAtCheckout;
