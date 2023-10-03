import { Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/react";
import ReviewForm from "./ReviewForm";

function ProductReviews({ product }) {
  const { data: session } = useSession();

  return (
    <div classNAme={styles.reviews}>
      <div className={styles.reviews__container}>
        <h1>Customer Reviews ({product?.reviews.length})</h1>
        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Average Rating</span>
            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name="half-rating-read"
                defaultValue={product?.rating}
                readOnly
                preceision={0.5}
              />
              {product?.rating === 0 ? "No review yet" : product?.rating}
            </div>
          </div>

          <div className={styles.reviews__stats_reviews}>
            {product?.ratings?.map((rating, i) => (
              <div key={i} className={styles.reviews__stats_reviews_review}>
                <Rating
                  name="half-rating-read"
                  defaultValue={5 - i}
                  readOnly
                  preceision={0.5}
                />

                <div className={styles.bar}>
                  <div
                    className={styles.bar__inner}
                    style={{ width: `${rating?.percentage}%` }}
                  ></div>
                </div>
                <span>{rating?.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {session ? (
          <ReviewForm product={product} />
        ) : (
          <button onClick={() => signIn()} className={styles.login_btn}>
            Login to add review
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductReviews;
