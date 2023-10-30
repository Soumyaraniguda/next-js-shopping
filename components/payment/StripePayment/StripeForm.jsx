import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styles from "./styles.module.scss";
import { useState } from "react";
import { updateOrderPayWithStripe } from "@/uiApiRequests/user.api";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      //   iconColor: "#000",
      //   color: "#000",
      //   fontSize: "16px",
      fontSmoothing: "antialiased",
      //   ":-webkit-autofill": { color: "#000" },
      //   "::placeholder": { color: "#000" },
    },
    invalid: {
      iconColor: "#fd0010169",
    },
  },
};

function StripeForm({ orderId, totalCost }) {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!result.error) {
      try {
        const { id } = result.paymentMethod;
        const res = updateOrderPayWithStripe({
          orderId,
          amount: totalCost,
          paymentId: id,
        });
        if (res.data.success) {
          window.location.reload(false);
        }
      } catch (error) {
        setError(error);
      }
    } else {
      setError(error.message);
    }
  };

  return (
    <div className={styles.stripe}>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_OPTIONS} />
        <button type="submit">PAY</button>
        {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
  );
}

export default StripeForm;
