import { Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

function ProductDetailsInfo({ product }) {
  const queryParams = useSearchParams();
  const size = queryParams.get("size");
  const style = queryParams.get("style");
  const [productSize, setProductSize] = useState();

  useEffect(() => {
    setProductSize(size);
  }, [size]);

  return (
    <div className={styles.infos}>
      <div className={styles.infos__container}>
        <h1 className={styles.infos__name}>{product?.name}</h1>

        <h2 className={styles.infos__sku}>{product?.sku}</h2>

        <div className={styles.infos__rating}>
          <Rating
            name="half-rating-read"
            defaultValue={product?.rating}
            precision={0.5}
            readOnly
            style={{ color: "#FACF19" }}
          />
          {product?.numReviews}
          {product?.numReviews === 1 ? "review" : "reviews"}
        </div>

        <div className={styles.infos__price}>
          {!size ? <h2>{product?.priceRange}</h2> : <h1>{product?.price}</h1>}
          {product?.discount > 0 ? (
            <h3>
              {size && <span>{product?.priceBefore}$</span>}

              <span> (-{product.discount}%)</span>
            </h3>
          ) : (
            <></>
          )}
        </div>

        <span className={styles.infos__shipping}>
          {product?.shipping
            ? `+${product.shipping}$ Shipping fee`
            : "Free Shipping"}
        </span>

        <span>
          {productSize
            ? product?.quantity
            : product?.sizes.reduce((start, next) => start + next.qty, 0)}{" "}
          pieces available.
        </span>

        <div className={styles.infos__sizes}>
          <h4>Select a size:</h4>
          <div className={styles.infos__wrap}>
            {product?.sizes.map((size, i) => (
              <Link href={`/product/${product._id}?style=${style}&size=${i}`}>
                <div
                  className={`${styles.infos__sizes_size} ${
                    i == productSize ? styles.active_size : ""
                  }`}
                  onClick={() => setProductSize(size.size)}
                >
                  {size.size}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsInfo;
