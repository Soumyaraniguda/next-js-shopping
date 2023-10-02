"use client";

import styles from "@/styles/product.module.scss";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

function Product({ params, query }) {
  const searchParams = useSearchParams();
  const productStyle = searchParams.get("style");
  const productSlug = params.slug;

  useEffect(() => {
    console.log({ productStyle, productSlug });

    axios
      .get(`/api/product/${productSlug}?style=${productStyle}`)
      .then((response) => {
        console.log(response.data?.data);
        //   setProducts(response.data?.data);
      });
  }, [productStyle, productSlug]);

  return <div>product</div>;
}

export default Product;
