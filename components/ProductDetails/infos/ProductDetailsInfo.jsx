import { Rating } from "@mui/material";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { TbPlus, TbMinus } from "react-icons/tb";
import { BsHandbagFill, BsHeart } from "react-icons/bs";
import ShareProduct from "./share/ShareProduct";
import ProductDetailsAccordion from "./ProductDetailsAccordion";
import SimilarProductsSwiper from "../similarProductsSwiper/SimilarProductsSwiper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "@/redux/cartSlice";

function ProductDetailsInfo({ product, setActiveImage }) {
  const dispatch = useDispatch();
  const queryParams = useSearchParams();
  const size = queryParams.get("size") || 0;
  const style = queryParams.get("style") || 0;
  const [productSize, setProductSize] = useState();
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const { cart } = useSelector((state) => ({ ...state }));

  // console.log({ productSize });

  const handleAddToCart = async () => {
    if (!size) {
      setError("Please select a size");
      return;
    }
    const { data } = await axios.get(
      `/api/product/get-product-to-add-in-cart/${product._id}?style=${product?.style}&size=${size}`
    );

    if (qty > data?.quantity) {
      setError(
        "The quantity you have chose is more than the stock. Try lowering the quantity"
      );
    } else if (data?.quantity < qty) {
      setError("The product is out of stock");
    } else {
      let _uid = `${data._id}_${product.style}_${size}`;
      let itemExistInCart = cart.cartItems?.find((p) => p._uid === _uid);
      // console.log({ cartItems: cart?.cartItems, itemExistInCart });

      if (itemExistInCart) {
        let newCart = cart.cartItems?.map((p) => {
          if (p._uid == itemExistInCart._uid) {
            return { ...p, qty: qty };
          }
          return p;
        });
        dispatch(updateCart(newCart));
      } else {
        dispatch(addToCart({ ...data, qty, size: data.size, _uid }));
      }
    }
  };

  useEffect(() => {
    setProductSize(size);
    if (qty > product?.quantity) {
      setQty(product.quantity);
    }
  }, [size, qty, product]);

  // Reset the product size and quantity when style changed
  useEffect(() => {
    setProductSize("");
    setQty(1);
  }, [style]);

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
          <button onClick={() => qty > 1 && setQty((prev) => prev - 1)}>
            <TbMinus />
          </button>
          <span>{qty}</span>
          <button
            onClick={() =>
              qty < product?.quantity && setQty((prev) => prev + 1)
            }
          >
            <TbPlus />
          </button>
        </div>

        <div className={styles.infos__actions}>
          <button
            disabled={product?.quantity < 1}
            style={{ cursor: `${product?.quantity < 1 ? "not-allowed" : ""}` }}
            onClick={() => handleAddToCart()}
          >
            <BsHandbagFill />
            <b>Add to cart</b>
          </button>

          <button>
            <BsHeart />
            <b>Wishlist</b>
          </button>
        </div>
        {error && <span className={styles.error}>{error}</span>}
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
