import { similar_products } from "@/data/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import "../../../styles/swiper.scss";

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

function SimilarProductsSwiper() {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={5}
      slidesPerGroup={3}
      navigation={true}
      modules={[Navigation]}
      className="swiper similarProducts__swiper products__swiper"
      // breakpoints={{
      //   640:{
      //     width:
      //   }
      // }}
    >
      {similar_products.map((product) => (
        <SwiperSlide key={JSON.stringify(product)}>
          <Link href="">
            <Image src={product} alt="" sizes="100vw" height={0} width={0} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SimilarProductsSwiper;
