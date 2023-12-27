import React, { useState } from "react";
import styles from "./../styles.module.scss";
import { sizesList } from "@/utils/sizes";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

function ProductDetails({ details, product, setProduct }) {
  const handleDetails = (i, e) => {
    const updatedDetails = [...details];
    const name = e.target.name;
    const value = e.target.value;
    updatedDetails[i][name] = value;
    setProduct({ ...product, details: updatedDetails });
  };

  const handleRemove = (i) => {
    if (details.length > 0) {
      const updatedDetails = [...details];
      updatedDetails.splice(i, 1);
      setProduct({ ...product, details: updatedDetails });
    }
  };

  const handleAddSize = () => {
    setProduct({
      ...product,
      details: [...details, { name: "", value: "" }],
    });
  };

  return (
    <div>
      <div className={styles.header}>Details</div>

      {!details.length ? (
        <BsFillPatchPlusFill className={styles.svg} onClick={handleAddSize} />
      ) : (
        <></>
      )}

      {details ? (
        details.map((detail, i) => {
          return (
            <div className={styles.sizesContainer} key={i}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={detail.name}
                onChange={(e) => handleDetails(i, e)}
              />
              <input
                type="text"
                name="value"
                placeholder="Value"
                value={detail.value}
                onChange={(e) => handleDetails(i, e)}
              />

              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill onClick={handleAddSize} />
              </>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetails;
