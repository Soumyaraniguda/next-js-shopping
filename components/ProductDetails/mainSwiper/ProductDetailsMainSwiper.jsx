import styles from "./styles.module.scss";
import "../../../styles/swiper.scss";
import Image from "next/image";
import ReactImageMagnify from "react-image-magnify";
import { useState } from "react";

function ProductDetailsMainSwiper({ images, activeImage }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "",
              isFluidWidth: true,
              src: activeImage || images[active].url,
            },
            largeImage: {
              src: activeImage || images[active].url,
              width: 1500,
              height: 2000,
            },
            enlargedImageContainerDimensions: {
              width: "200%",
              height: "100%",
            },
          }}
        />
      </div>
      <div className={styles.swiper__list}>
        {images.map((img, i) => (
          <div
            className={`${styles.swiper__list_item} ${
              i == active && styles.active
            }`}
            key={i}
            onMouseOver={() => setActive(i)}
          >
            <img src={img.url} alt="" key={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetailsMainSwiper;
