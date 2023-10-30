import { loadStripe } from "@stripe/stripe-js";
import styles from "./styles.module.scss";
import { getStripeKeys } from "@/utils/tokens";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";

function StripePayment({ totalCost, orderId }) {
  const stripeKey = getStripeKeys().id;
  const stripePromise = loadStripe(stripeKey);

  return (
    <Elements stripe={stripePromise}>
      <StripeForm totalCost={totalCost} orderId={orderId} />
    </Elements>
  );
}

export default StripePayment;
