"use client";

import CreateSubCategory from "@/components/admin/subCategories/CreateSubCategory";
import SubCategoryList from "@/components/admin/subCategories/SubCategoryList";

import {
  getCategories,
  getSubCategories,
} from "@/uiApiRequests/categories.api";
import React, { useEffect, useState } from "react";

function DashboardSubCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  console.log(subCategories);

  useEffect(() => {
    getSubCategories()
      .then((response) => {
        setSubCategories(response.data.subCategories);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

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
      <CreateSubCategory
        setSubCategories={setSubCategories}
        categories={categories}
      />
      <SubCategoryList
        subCategories={subCategories}
        setSubCategories={setSubCategories}
        categories={categories}
      />
    </div>
  );
}

export default DashboardSubCategories;
