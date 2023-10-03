import { IoArrowDown } from "react-icons/io5";
import styles from "./styles.module.scss";
import { useState } from "react";
import Image from "next/image";

function ReviewSelectInput({ property, text, data, handleChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.select}>
      {text}:
      <div
        className={styles.select__header}
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{
          background: `${
            text == "Style" && property?.color && `${property.color}`
          }`,
        }}
      >
        <span
          className={`${styles.flex} ${styles.select__header_wrap}`}
          style={{
            padding: "0 5px",
          }}
        >
          {text == "Size" ? (
            property || `Select ${text}`
          ) : text == "Style" && property?.image ? (
            <Image src={property.image} height={20} width={20} alt="" />
          ) : text == "How does it fit" && property ? (
            property
          ) : !property && text == "How does it fit" ? (
            "How does it fit"
          ) : (
            "Select style"
          )}
          <IoArrowDown />
        </span>
        {visible && (
          <ul className={styles.select__header_menu}>
            {data?.map((item, i) => {
              if (text == "Size") {
                return (
                  <li key={i} onClick={() => handleChange(item.size)}>
                    <span>{item.size}</span>
                  </li>
                );
              }
              if (text == "Style") {
                return (
                  <li
                    key={i}
                    onClick={() => handleChange(item)}
                    style={{ background: `${item.color}` }}
                  >
                    <span>
                      <Image src={item.image} height={20} width={20} alt="" />
                    </span>
                  </li>
                );
              }
              if (text == "How does it fit") {
                return (
                  <li key={i} onClick={() => handleChange(item)}>
                    <span>{item}</span>
                  </li>
                );
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ReviewSelectInput;
