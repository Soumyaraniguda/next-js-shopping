"use client";

import SubCategoriesTable from "@/components/admin/subCategories/SubCategoriesTable";
import SubCategoryFormDialog from "@/components/admin/subCategories/SubCategoryFormDialog";
import {
  deleteSubCategory,
  getCategories,
  getSubCategories,
} from "@/uiApiRequests/categories.api";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function DashboardSubCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [subCategoryDetails, setSubCategoryDetails] = useState();

  const handleCreateSubCategory = () => {
    setOpenFormDialog(true);
  };

  const handleSelectDetails = (event, subCategory) => {
    setOpenFormDialog(true);
    setSubCategoryDetails(subCategory);
  };

  const handleDeleteSubCategory = (subCategory) => {
    deleteSubCategory(subCategory._id)
      .then((response) => {
        setSubCategories(response.data.subCategories);
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.message);
        } else {
          toast.error("Delete failed");
        }
      });
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setSubCategoryDetails(null);
  };

  // Fetch Categories
  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  // Fetch Sub-categories
  useEffect(() => {
    getSubCategories()
      .then((response) => {
        setSubCategories(response.data.subCategories);
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
            onCloseFormDialog={handleCloseFormDialog}
            categories={categories}
            setSubCategories={setSubCategories}
            subCategoryDetails={subCategoryDetails}
          />
        )}
        <SubCategoriesTable
          subCategories={subCategories}
          onCreateSubCategory={handleCreateSubCategory}
          onSelectDetails={handleSelectDetails}
          onDeleteSubCategory={handleDeleteSubCategory}
        />
      </>
    </div>
  );
}

export default DashboardSubCategories;
