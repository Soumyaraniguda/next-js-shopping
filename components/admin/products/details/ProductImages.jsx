import { ErrorMessage, useField } from "formik";
import React, { useRef } from "react";
import styles from "./../styles.module.scss";
import Image from "next/image";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { RiDeleteBin6Line, RiShape2Line } from "react-icons/ri";
import { GiExtractionOrb } from "react-icons/gi";

function ProductImages({
  images,
  setImages,
  header,
  text,
  name,
  setColorImage,
  ...props
}) {
  const fileInputRef = useRef(null);
  const [meta, field] = useField(props);
  const MAX_PRODUCT_IMAGES = 6;

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, i) => {
      if (i == 5 || images.length == MAX_PRODUCT_IMAGES) {
        toast.error(`Maximum ${MAX_PRODUCT_IMAGES} images are allowed.`);
        return;
      } else if (img.type !== "image/jpeg" && img.type !== "image/png") {
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
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };

  const handleRemove = (image) => {
    setImages((images) => images.filter((item) => item !== image));
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
        name={name}
        ref={fileInputRef}
        hidden
        multiple
        accept="image/jpeg,image/png"
        onChange={handleImages}
      />
      <div className={styles.images__main}>
        <div className={`${styles.images__main_grid}`}>
          {!images.length ? (
            <Image
              src="/images/no_image.png"
              alt="No images"
              height={0}
              width={0}
              sizes="100vw"
              style={{ width: "100px" }}
            />
          ) : (
            <Box display="flex" flexDirection="row" gap={4} flexWrap={"wrap"}>
              {images.map((image) => (
                <div className={styles.images__main_grid_wrap}>
                  <div className={styles.blur}></div>
                  <Image
                    key={image}
                    src={image}
                    alt="Product image"
                    height={0}
                    width={0}
                    sizes="100vw"
                  />
                  <div className={styles.images__main_grid_actions}>
                    <button onClick={() => handleRemove(image)}>
                      <RiDeleteBin6Line />
                    </button>
                    <button onClick={() => setColorImage(image)}>
                      <GiExtractionOrb />
                    </button>
                    <button>
                      <RiShape2Line />
                    </button>
                  </div>
                </div>
              ))}
            </Box>
          )}
        </div>
      </div>
      <button
        type="reset"
        disabled={images.length == MAX_PRODUCT_IMAGES}
        style={{ opacity: `${images.length == MAX_PRODUCT_IMAGES && "0.5"}` }}
        onClick={() => fileInputRef.current.click()}
        className={`${styles.btn} ${styles.btn_primary}`}
      >
        {text}
      </button>
    </div>
  );
}

export default ProductImages;
