"use client";

import {
  getCategories,
  getSubCategoriesByCategory,
} from "@/uiApiRequests/categories.api";
import {
  getProductDetails,
  getProductsWithFilteredData,
} from "@/uiApiRequests/products.api";
import { getInitialProductDetails } from "@/utils/product";
import React, { useEffect, useState } from "react";

function ProductDetailsForm() {
  const intialDetails = getInitialProductDetails();
  const [parentProducts, setParentProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(intialDetails);
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  // UseEffect to GET the Parent product details
  useEffect(() => {
    if (productDetails.parent) {
      getProductDetails(productDetails.parent)
        .then((response) => {
          if (response.data) {
            const parentProductDetails = response.data;
            const { name, description, brand, category, subCategories } =
              parentProductDetails;
            setProductDetails((prev) => {
              return {
                ...prev,
                name,
                description,
                brand,
                category,
                subCategories,
              };
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else return;
  }, [productDetails.parent]);

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

  return <div>ProductDetailsForm</div>;
}

export default ProductDetailsForm;
