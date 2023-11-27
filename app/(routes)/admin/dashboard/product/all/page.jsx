"use client";

import ProductsList from "@/components/admin/products/ProductsList";
import ProductsTable from "@/components/admin/products/ProductsTable";
import { getProducts } from "@/uiApiRequests/products.api";
import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h5">
        All Products {loading && <CircularProgress size={18} />}
      </Typography>

      <ProductsList products={products} />
    </div>
  );
}

export default Products;
