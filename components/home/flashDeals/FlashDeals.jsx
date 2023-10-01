import { MdFlashOn } from "react-icons/md";
import styles from "./page.module.scss";
import Countdown from "@/components/countdown/Countdown";
import "../../../styles/swiper.scss";

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";
import { flashDealsArray } from "@/data/home";
import FlasDealsCard from "./FlasDealsCard";

function FlashDeals() {
  return (
    <div className={styles.flashDeals}>
      <div className={styles.flashDeals__header}>
        <h1>
          FLASH SALE <MdFlashOn />
        </h1>
        <Countdown date={new Date(2023, 10, 2)} />
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="flasDeals__swiper"
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
        <div className={styles.flashDeals__swiper}>
          {flashDealsArray.map((product, i) => (
            <SwiperSlide key={JSON.stringify(product)}>
              <FlasDealsCard product={product} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default FlashDeals;
