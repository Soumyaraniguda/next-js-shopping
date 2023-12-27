"use client";

import MultipleSelectChip from "@/components/inputs/select/MultipleSelect";
import SingularSelect from "@/components/inputs/select/SingularSelect";
import { getSubCategoriesByCategory } from "@/uiApiRequests/categories.api";
import React, { useEffect, useState } from "react";

function ProductCategory({ product, onChange, categories }) {
  const [subCategories, setSubCategories] = useState([]);

  // UseEffect to GET the Sub-categories
  useEffect(() => {
    if (product.category) {
      getSubCategoriesByCategory(product.category)
        .then((response) => {
          setSubCategories(response.data.subCategories);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [product.category]);

  console.log("product =", product);

  return (
    <div>
      <SingularSelect
        name="category"
        value={product.category}
        placeholder="Category"
        data={categories}
        header="Select a Category"
        handleChange={onChange}
        disabled={product.parent ? true : false}
      />
      {product.category ? (
        <MultipleSelectChip
          value={product.subCategories}
          data={subCategories}
          header="Select Sub-categories"
          name="subCategories"
          disabled={product.parent ? true : false}
          handleChange={onChange}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductCategory;
