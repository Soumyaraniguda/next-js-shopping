"use client";

import styles from "@/styles/product.module.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/page";
import ProductDetailsMainSwiper from "@/components/ProductDetails/mainSwiper/ProductDetailsMainSwiper";
import ProductDetailsInfo from "@/components/ProductDetails/infos/ProductDetailsInfo";
import ProductReviews from "@/components/ProductDetails/reviews/ProductReviews";

function Product({ params, query }) {
  const searchParams = useSearchParams();
  const productStyle = searchParams.get("style");
  const productSize = searchParams.get("size");
  const productId = params.id;
  const [product, setProduct] = useState();
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    axios
      .get(
        `/api/product/${productId}?style=${productStyle}&size=${
          productSize || 0
        }`
      )
      .then((response) => {
        // console.log(response.data);
        setProduct(response.data);
      });
  }, [productStyle, productId, productSize]);

  return (
    <div>
      <Header />
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.path}>
            Home / {product?.category.name}
            {product?.subCategories.map((sub) => (
              <span> / {sub.name}</span>
            ))}
          </div>

          <div className={styles.product__main}>
            {product && (
              <ProductDetailsMainSwiper
                images={product?.images}
                activeImage={activeImage}
              />
            )}
            <ProductDetailsInfo
              product={product}
              setActiveImage={setActiveImage}
            />
          </div>

          <ProductReviews product={product} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
