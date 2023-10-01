import styles from "./styles.module.scss";
import "../../styles/swiper.scss";

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";
import Image from "next/image";

function ProductSwiper({ header, products, bg }) {
  return (
    <div className={styles.wrapper}>
      {header && (
        <div className={styles.header} style={{ background: bg || "" }}>
          {header}
        </div>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          630: {
            slidesPerView: 3,
          },
          920: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
          1500: {
            slidesPerView: 6,
          },
        }}
      >
        {products.map((product, i) => (
          <SwiperSlide key={i}>
            <div className={styles.product}>
              <div className={styles.product__img}>
                <Image
                  src={product.image}
                  alt=""
                  sizes="100vw"
                  height={0}
                  width={0}
                />
              </div>
              <div className={styles.product__infos}>
                <h1>
                  {product.name.length > 30
                    ? `${product.name.slice(0, 30)}...`
                    : product.name}
                </h1>
                {product.price && <span>USD {product.price}$</span>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSwiper;
