"use client";

import ProductDetailsForm from "@/components/admin/products/details/ProductDetailsForm";
import { getCategories } from "@/uiApiRequests/categories.api";
import { getProductsWithFilteredData } from "@/uiApiRequests/products.api";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function CreateProduct() {
  const [parentProducts, setParentProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Use Effect to all parent products
  useEffect(() => {
    getProductsWithFilteredData(["name", "subProducts"])
      .then((response) => {
        setParentProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // UseEffect to GET the Categories
  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h5">Create Product</Typography>
      <ProductDetailsForm
        parentProducts={parentProducts}
        categories={categories}
      />
    </div>
  );
}

export default CreateProduct;
