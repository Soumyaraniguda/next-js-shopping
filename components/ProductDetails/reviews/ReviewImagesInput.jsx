import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { MdOutlineRemoveCircle } from "react-icons/md";

function ReviewImageInput({ images, setImages }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  console.log({ error });

  const handleImages = (e) => {
    let files = Array.from(e.target.files);

    files.forEach((img, i) => {
      console.log("indesx =", i);
      if (images.length === 3 || i == 2) {
        setError("Maximum 3 images are allowed.");
        return true;
      } else if (img.type !== "image/jpeg" && img.type !== "image/png") {
        setError(
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

  const removeImage = (image) => {
    setImages((images) => images.filter((img) => img !== image));
    if (images.length <= 3) {
      setError("");
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImages}
        multiple
        accept="image/png, image/jpeg"
      />
      <button
        className={styles.submit_btn}
        style={{ width: "150px" }}
        onClick={() => inputRef.current.click()}
      >
        Add images
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.images_wrap}>
        {images.length > 0 ? (
          images.map((image, i) => (
            <span key={i}>
              <MdOutlineRemoveCircle onClick={() => removeImage(image)} />
              <Image src={image} alt="" width={70} height={100} />
            </span>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ReviewImageInput;
