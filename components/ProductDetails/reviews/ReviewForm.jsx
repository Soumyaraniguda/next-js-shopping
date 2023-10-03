import { useState } from "react";
import ReviewSelectInput from "./ReviewSelectInput";
import styles from "./styles.module.scss";

function ReviewForm({ product }) {
  const [size, setSize] = useState();
  const [style, setStyle] = useState();

  return (
    <div className={styles.reviews__form}>
      <div className={`${styles.flex} ${styles.wrap}`}>
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
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
