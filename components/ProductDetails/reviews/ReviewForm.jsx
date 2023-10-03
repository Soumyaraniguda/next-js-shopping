import { useState } from "react";
import ReviewSelectInput from "./ReviewSelectInput";
import styles from "./styles.module.scss";
import { Rating } from "@mui/material";
import ReviewImageInput from "./ReviewImagesInput";

let fits = ["Small", "True to size", "Large"];

function ReviewForm({ product }) {
  const [size, setSize] = useState();
  const [style, setStyle] = useState();
  const [fit, setFit] = useState();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);

  return (
    <div className={styles.reviews__form}>
      <div className={styles.reviews__form_wrap}>
        <div className={styles.flex} style={{ gap: "10px" }}>
          <ReviewSelectInput
            property={size}
            text="Size"
            data={product?.allSizes?.filter((x) => x.size !== size) || []}
            handleChange={setSize}
          />

          <ReviewSelectInput
            property={style}
            text="Style"
            data={product?.colors?.filter((x) => x !== style) || []}
            handleChange={setStyle}
          />

          <ReviewSelectInput
            property={fit}
            text="How does it fit"
            data={fits?.filter((x) => x !== fit) || []}
            handleChange={setFit}
          />
        </div>
        <ReviewImageInput images={images} setImages={setImages} />
        <textarea
          name="review"
          id=""
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
        />
        <Rating
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ fontSize: "2rem" }}
        />
        <button className={styles.submit_btn}>Submit Review</button>
      </div>
    </div>
  );
}

export default ReviewForm;
