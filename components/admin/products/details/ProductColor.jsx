import React from "react";
import styles from "../styles.module.scss";

function ProductColor({ productDetails }) {
  return (
    <div className={styles.flex}>
      {productDetails?.color?.image ? (
        <img
          src={productDetails.color.image}
          className={styles.image_span}
          alt=""
        />
      ) : (
        <></>
      )}
      {productDetails?.color?.color ? (
        <span
          className={styles.color_span}
          style={{ background: `${product.color.color}` }}
        ></span>
      ) : (
        <></>
      )}
      ProductColor
    </div>
  );
}

export default ProductColor;
