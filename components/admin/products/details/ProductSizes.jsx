import React, { useState } from "react";
import styles from "./../styles.module.scss";
import { sizesList } from "@/utils/sizes";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

function ProductSizes({ sizes, product, setProduct }) {
  const [noSize, setNoSize] = useState(false);

  const handleSize = (i, e) => {
    const updatedSizes = [...sizes];
    const name = e.target.name;
    const value = e.target.value;
    updatedSizes[i][name] = value;
    setProduct({ ...product, sizes: updatedSizes });
  };

  const handleRemove = (i) => {
    if (sizes.length > 1) {
      const updatedSizes = [...sizes];
      updatedSizes.splice(i, 1);
      setProduct({ ...product, sizes: updatedSizes });
    }
  };

  const handleAddSize = () => {
    setProduct({
      ...product,
      sizes: [...sizes, { size: "", qty: "", price: "" }],
    });
  };

  const handleToggleNoSize = () => {
    const value = !noSize;
    // If there is no size remove the size from sizes
    if (value) {
      const updatedSizes = sizes.map((item) => {
        return {
          qty: item.qty,
          price: item.price,
        };
      });
      setProduct({ ...product, sizes: [updatedSizes[0]] });
    } else {
      const updatedSizes = sizes.map((item) => {
        return {
          size: item.size || "",
          qty: item.qty,
          price: item.price,
        };
      });
      setProduct({ ...product, sizes: updatedSizes });
    }
    setNoSize(value);
  };

  return (
    <div>
      <div className={styles.header}>Sizes / Quanity / Price</div>
      <button
        type="reset"
        className={styles.click_btn}
        onClick={handleToggleNoSize}
      >
        {noSize ? "Click if product has size" : "Click if product has no size"}
      </button>
      {sizes ? (
        sizes.map((size, i) => {
          return (
            <div className={styles.sizesContainer} key={i}>
              <select
                name="size"
                value={noSize ? "" : size.size}
                disabled={noSize}
                style={{ display: `${noSize ? "none" : ""}` }}
                onChange={(e) => handleSize(i, e)}
              >
                <option value="">Select a size</option>
                {sizesList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="qty"
                placeholder={noSize ? "Product Quantity" : "Size Quantity"}
                min={1}
                value={size.qty}
                onChange={(e) => handleSize(i, e)}
              />
              <input
                type="number"
                name="price"
                placeholder={noSize ? "Product Price" : "Size Price"}
                min={1}
                value={size.price}
                onChange={(e) => handleSize(i, e)}
              />
              {!noSize ? (
                <>
                  <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                  <BsFillPatchPlusFill onClick={handleAddSize} />
                </>
              ) : (
                ""
              )}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductSizes;
