import React, { useState } from "react";
import styles from "../styles.module.scss";
import { ErrorMessage, useField } from "formik";
import Image from "next/image";
import { ColorExtractor } from "react-color-extractor";
import { TbArrowUpRightCircle } from "react-icons/tb";

function ProductColor({
  product,
  setProduct,
  name,
  colorImage,
  header,
  ...props
}) {
  const [toggle, setToggle] = useState(false);
  const [colors, setColors] = useState([]);
  const [field, meta] = useField(props);

  const renderSwatcher = () => {
    return colors?.map((color, id) => (
      <div
        className={styles.square__color}
        key={id}
        style={{ backgroundColor: color }}
        onClick={() =>
          setProduct({
            ...product,
            color: { color, image: product.color.image },
          })
        }
      >
        {color}
      </div>
    ));
  };

  const inputError = meta?.error;

  return (
    <>
      <div className={styles.flex}>
        {product.color.image && (
          <img src={product.color.image} className={styles.image_span} alt="" />
        )}
        {product.color.color && (
          <span
            className={styles.color_span}
            style={{ background: `${product.color.color}` }}
          ></span>
        )}
      </div>

      <div className={styles.colors}>
        <div
          className={`${styles.header} ${
            inputError ? styles.header__error : ""
          }`}
        >
          <div className={styles.flex}>
            {header}
            {inputError && (
              <Image
                alt="No color warning"
                src="/images/warning.png"
                height={25}
                width={25}
              />
            )}
          </div>
          <span>
            {meta.touched && meta.error && (
              <div className={styles.error__msg}>
                <span></span>
                <ErrorMessage name={name} />
              </div>
            )}
          </span>
        </div>
        <input
          type="text"
          value={product.color.color}
          name={name}
          hidden
          {...field}
          {...props}
        />
        <div className={styles.colors__infos}>
          <div className={toggle ? styles.toggle : ""}>
            <ColorExtractor getColors={(colors) => setColors(colors)}>
              <img src={colorImage} style={{ display: "none" }} />
            </ColorExtractor>
            <div className={styles.wheel}>{renderSwatcher()}</div>
          </div>
          {colors.length > 0 && (
            <TbArrowUpRightCircle
              className={styles.toggle__btn}
              onClick={() => setToggle((prev) => !prev)}
              style={{ transform: `${toggle ? "rotate(180deg)" : ""}` }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProductColor;
