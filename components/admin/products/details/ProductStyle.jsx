import { ErrorMessage, useField } from "formik";
import React, { useRef } from "react";
import styles from "./../styles.module.scss";
import Image from "next/image";
import { toast } from "react-toastify";

function ProductStyle({
  product,
  setProduct,
  header,
  text,
  name,
  colorImage,
  ...props
}) {
  const fileInputRef = useRef(null);
  const [meta, field] = useField(props);
  const MAX_PRODUCT_IMAGES = 6;

  const handleImage = (e) => {
    let img = e.target.files[0];

    if (img.type !== "image/jpeg" && img.type !== "image/png") {
      toast.error(
        `${img.name} format is unsupported! only JPEG and PNG are allowed`
      );
      files = files.filter((item) => item.name !== img.name);
      return;
    } else if (img.size > 1024 * 1024 * 5) {
      // Cannot upload file with 5MB
      setError(`${img.name} size is too large max 5MB allowed`);
      files = files.filter((item) => item.name !== img.name);
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        console.log("e =", e.target);
        let obj = {
          color: product.color.color,
          image: e.target.result,
        };
        setProduct({ ...product, color: obj });
      };
    }
  };

  const inputError = meta?.error?.[name];
  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${inputError ? styles.header__error : ""}`}
      >
        <div className={styles.flex}>
          {inputError && (
            <Image
              alt="Buyer protection"
              src="/images/warning.png"
              height={50}
              width={40}
            />
          )}
          {header}
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
        type="file"
        name="colorImageInput"
        ref={fileInputRef}
        hidden
        multiple
        accept="image/jpeg,image/png"
        onChange={handleImage}
      />

      <button
        type="reset"
        onClick={() => fileInputRef.current.click()}
        className={`${styles.btn} ${styles.btn_primary}`}
      >
        {text}
      </button>
    </div>
  );
}

export default ProductStyle;
