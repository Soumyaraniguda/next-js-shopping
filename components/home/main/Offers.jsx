import styles from "./page.module.scss";
import "../../../styles/swiper.scss";
import { offersAarray } from "@/data/home";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

export default function Offers() {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="offers-swiper"
      >
        {offersAarray.map((offer) => (
          <SwiperSlide>
            <Link href="">
              <Image src={offer.image} width={0} height={200} sizes="100vw" />
            </Link>
            <span>{offer.price}$</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
