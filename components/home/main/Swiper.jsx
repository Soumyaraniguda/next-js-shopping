import styles from "./page.module.scss";
import "../../../styles/swiper.scss";

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function MainSwiper() {
  return (
    <>
      {/* <button className={styles.btn_primary}>Test</button> */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper"
      >
        {[...Array(10).keys()].map((i) => (
          // https://stackoverflow.com/questions/65169431/how-to-set-the-next-image-component-to-100-height
          <SwiperSlide key={i}>
            <Image
              alt="Product images"
              src={`/images/swiper/${i + 1}.jpg`}
              width={0}
              height={0}
              sizes="100vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
