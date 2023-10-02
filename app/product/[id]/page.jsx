"use client";

import styles from "@/styles/product.module.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/page";
import ProductDetailsMainSwiper from "@/components/ProductDetails/mainSwiper/ProductDetailsMainSwiper";

function Product({ params, query }) {
  const searchParams = useSearchParams();
  const productStyle = searchParams.get("style");
  const productId = params.id;
  const [product, setProduct] = useState();
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    axios
      .get(`/api/product/${productId}?style=${productStyle}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      });
  }, [productStyle, productId]);

  return (
    <div>
      <Header />
      <div className={styles.product}>
        <div className={styles.container}>
          <div className={styles.path}>
            Home / {product?.category.name}
            {product?.subCategories.map((sub) => (
              <span> / {sub.name}</span>
            ))}
          </div>

          <div className={styles.product__main}>
            {product ? (
              <ProductDetailsMainSwiper
                images={product?.images}
                activeImage={activeImage}
              />
            ) : (
              <></>
            )}
            <div></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
