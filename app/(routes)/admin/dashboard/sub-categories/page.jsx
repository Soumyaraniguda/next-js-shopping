"use client";

import CreateSubCategory from "@/components/admin/subCategories/CreateSubCategory";
import SubCategoriesTable from "@/components/admin/subCategories/SubCategoriesTable";
import SubCategoryFormDialog from "@/components/admin/subCategories/SubCategoryFormDialog";
import SubCategoryList from "@/components/admin/subCategories/SubCategoryList";
import {
  getCategories,
  getSubCategories,
} from "@/uiApiRequests/categories.api";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function DashboardSubCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const handleCreateSubCategory = () => {
    setOpenFormDialog(true);
  };

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
      <Typography variant="h5">Sub-categories</Typography>
      <>
        {openFormDialog && (
          <SubCategoryFormDialog
            openFormDialog={openFormDialog}
            onCloseFormDialog={setOpenFormDialog}
            categories={categories}
            setSubCategories={setSubCategories}
          />
        )}
        <SubCategoriesTable
          subCategories={subCategories}
          onCreateSubCategory={handleCreateSubCategory}
        />
      </>
      {/* <CreateSubCategory
        setSubCategories={setSubCategories}
        categories={categories}
      />
      <SubCategoryList
        subCategories={subCategories}
        setSubCategories={setSubCategories}
        categories={categories}
      /> */}
    </div>
  );
}

export default DashboardSubCategories;
