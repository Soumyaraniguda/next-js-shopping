"use client";

import MultipleSelectChip from "@/components/inputs/select/MultipleSelect";
import SingularSelect from "@/components/inputs/select/SingularSelect";
import { getSubCategoriesByCategory } from "@/uiApiRequests/categories.api";
import React, { useEffect, useState } from "react";

function ProductCategory({ productDetails, onChange, categories }) {
  const [subCategories, setSubCategories] = useState([]);

  // UseEffect to GET the Sub-categories
  useEffect(() => {
    if (productDetails.category) {
      getSubCategoriesByCategory(productDetails.category)
        .then((response) => {
          setSubCategories(response.data.subCategories);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [productDetails.category]);

  console.log("productDetails =", productDetails);

  return (
    <div>
      <SingularSelect
        name="category"
        value={productDetails.category}
        placeholder="Category"
        data={categories}
        header="Select a Category"
        handleChange={onChange}
        disabled={productDetails.parent ? true : false}
      />
      {productDetails.category ? (
        <MultipleSelectChip
          value={productDetails.subCategories}
          data={subCategories}
          header="Select Sub-categories"
          name="subCategories"
          disabled={productDetails.parent ? true : false}
          handleChange={onChange}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductCategory;
