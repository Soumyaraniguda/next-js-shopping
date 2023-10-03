import { Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TbPlus, TbMinus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import ShareProduct from "../share/ShareProduct";
import ProductDetailsAccordion from "./ProductDetailsAccordion";
import SimilarProductsSwiper from "../ similarProductsSwiper/SimilarProductsSwiper";

function ProductDetailsInfo({ product, setActiveImage }) {
  const queryParams = useSearchParams();
  const size = queryParams.get("size");
  const style = queryParams.get("style");
  const [productSize, setProductSize] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProductSize(size);
    if (quantity > product?.quantity) {
      setQuantity(product.quantity);
    }
  }, [size]);

  // Reset the product size and quantity when style changed
  useEffect(() => {
    setProductSize("");
    setQuantity(1);
  }, [style]);

  console.log({ product, productSize, style });

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
          ({product?.numReviews}
          {product?.numReviews === 1 ? " review" : " reviews"})
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
          <div className={styles.infos__sizes_wrap}>
            {product?.sizes.map((size, i) => (
              <Link
                key={i}
                href={`/product/${product._id}?style=${style}&size=${i}`}
              >
                <div
                  className={`${styles.infos__sizes_size} ${
                    i === parseInt(productSize) ? styles.active_size : ""
                  }`}
                  onClick={() => setProductSize(size.size)}
                >
                  {size.size}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.infos__colors}>
          {product?.colors &&
            product?.colors.map((color, i) => (
              <span
                className={i == style ? styles.active_color : ""}
                key={i}
                onMouseOver={() =>
                  setActiveImage(product.subProducts[i].images[0].url)
                }
              >
                <Link href={`/product/${product._id}?style=${i}`}>
                  <Image src={color.image} width={50} height={50} alt="" />
                </Link>
              </span>
            ))}
        </div>

        <div className={styles.infos__qty}>
          <button
            onClick={() => quantity > 1 && setQuantity((prev) => prev - 1)}
          >
            <TbMinus />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() =>
              quantity < product?.quantity && setQuantity((prev) => prev + 1)
            }
          >
            <TbPlus />
          </button>
        </div>

        <div className={styles.infos__actions}>
          <button
            disabled={product?.quantity < 1}
            style={{ cursor: `${product?.quantity < 1 ? "not-allowed" : ""}` }}
          >
            <BsHandbagFill />
            <b>Add to cart</b>
          </button>

          <button>
            <BsHeart />
            <b>Wishlist</b>
          </button>
        </div>

        <ShareProduct />

        {product?.details && product?.description && (
          <ProductDetailsAccordion
            descriptionAndDetails={[product?.description, ...product?.details]}
          />
        )}

        <SimilarProductsSwiper />
      </div>
    </div>
  );
}

export default ProductDetailsInfo;
