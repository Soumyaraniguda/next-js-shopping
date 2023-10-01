import styles from "./styles.module.scss";

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";

function ProductSwiper({ header }) {
  return (
    <div className={styles.wrapper}>
      {header && <div className={styles.header}>{header}</div>}
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="products__swiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProductSwiper;
