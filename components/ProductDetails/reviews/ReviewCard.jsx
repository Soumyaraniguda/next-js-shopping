import Image from "next/image";
import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import { AiOutlineLike } from "react-icons/ai";

function ReviewCard({ review }) {
  const user = review?.reviewBy || {};
  const name = user?.name || "user";
  const image = user?.image || "/images/user-avatar.svg";
  return (
    <div className={styles.review}>
      <div className={styles.flex}>
        <div className={styles.review__user}>
          <h4>
            {name.slice(0, 1)}***{name.slice(name.length - 1, name.length)}
          </h4>
          <Image src={image} height={30} width={30} alt="" />
        </div>
        <div className={styles.review__review}>
          <Rating
            name="half-rating-read"
            defaultValue={review?.rating}
            readOnly
          />
          <p>{review?.review}</p>
          <p>
            <span>Overall Fit:</span>
            {review?.fit} <span>Size: </span>
            {review?.size}{" "}
            <div className={styles.flex}>
              <Image
                className={styles.review__img}
                src={review?.style?.image}
                height={40}
                width={40}
                alt=""
              />
            </div>
          </p>
        </div>
      </div>

      <div className={styles.flex}>
        <div className={styles.review__images}>
          {review?.images?.length > 0 ? (
            review?.images.map((image) => (
              <Image src={image.url} height={0} width={0} sizes="100vw" />
            ))
          ) : (
            <></>
          )}
        </div>

        <div className={styles.review__extra}>
          <div className={styles.review__extra_likes}>
            {review?.likes && review.likes?.likes} <AiOutlineLike />
          </div>
          <div className={styles.review__extra_date}>
            {review?.updatedAt.slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
