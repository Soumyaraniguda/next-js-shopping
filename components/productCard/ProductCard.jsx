import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import ProductCardSwiper from "./ProductCardSwiper";

function ProductCard({ product }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState([]);
  const [prices, setPrices] = useState([]);

  const [productStyles, setProductStyles] = useState(
    product.subProducts?.map((p) => p.color)
  );

  useEffect(() => {
    setImages(product.subProducts[active]?.images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((s) => s.price)
        .sort((a, b) => a - b)
    );
  }, [active]);

  return (
    <div className={styles.productCard}>
      <div className={styles.productCard__container}>
        <Link href={`/product/${product.slug}?style=${active}`}>
          <div>
            <ProductCardSwiper images={images}></ProductCardSwiper>
          </div>
        </Link>
        {product.subProducts[active]?.discount ? (
          <div className={styles.productCard__discount}>
            -{product.subProducts[active].discount}%
          </div>
        ) : (
          <></>
        )}
        <div className={styles.productCard__infos}>
          <h1>
            {product.name.length > 45
              ? `${product.name.substring(0, 45)}...`
              : product.name}
          </h1>
          <span>
            {prices.length === 1
              ? `USD${prices[0]}$`
              : `USD ${prices[0]} - ${prices[prices.length - 1]}$`}
          </span>
          <div className={styles.productCard__colors}>
            {productStyles &&
              productStyles.map((productStyle, i) =>
                productStyle.image ? (
                  <img
                    key={i}
                    src={productStyle.image}
                    className={i == active ? styles.active : ""}
                    alt=""
                    onMouseOver={() => {
                      setActive(i);
                    }}
                  />
                ) : (
                  <span
                    key={i}
                    style={{ backgroundColor: `${productStyle.color}` }}
                    onMouseOver={() => {
                      setActive(i);
                    }}
                  ></span>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
