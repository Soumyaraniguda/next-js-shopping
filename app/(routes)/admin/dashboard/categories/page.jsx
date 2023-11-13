"use client";

import CategoryList from "@/components/admin/categories/CategoryList";
import CreateCategory from "@/components/admin/categories/CreateCategory";
import { getCategories } from "@/uiApiRequests/categories.api";
import React, { useEffect, useState } from "react";

function DashboardCategories() {
  const [categories, setCategories] = useState([]);
  // console.log(categories);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  return (
    <div>
      <CreateCategory setCategories={setCategories} />
      <CategoryList categories={categories} setCategories={setCategories} />
    </div>
  );
}

export default DashboardCategories;
