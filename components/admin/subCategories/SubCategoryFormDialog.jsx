import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { MdClose } from "react-icons/md";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import SingularSelect from "@/components/inputs/select/SingularSelect";
import AdminInput from "@/components/inputs/adminInput/AdminInput";
import { Box } from "@mui/material";
import {
  addSubCategory,
  updateSubCategory,
} from "@/uiApiRequests/categories.api";
import { toast } from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function SubCategoryFormDialog({
  openFormDialog,
  onCloseFormDialog,
  categories,
  setSubCategories,
  subCategoryDetails,
}) {
  const handleClose = () => {
    onCloseFormDialog();
  };

  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryParent, setSubCategoryParent] = useState("");

  const validate = Yup.object({
    subCategoryName: Yup.string()
      .required("Sub-category name is required")
      .min(2, "Sub-category name must between 2 and 30 characters.")
      .max(30, "Sub-category name must between 2 and 30 characters")
      .matches(
        /^[A-Za-z\s]*$/,
        "Numbers and special characters are not allowed."
      ),
    subCategoryParent: Yup.string().required(
      "Please choose a parent category."
    ),
  });

  const handleSubmit = () => {
    console.log("category =", subCategoryDetails);
    if (subCategoryDetails && subCategoryDetails._id) {
      updateSubCategory({
        id: subCategoryDetails._id,
        subCategoryName,
        subCategoryParent,
      })
        .then((response) => {
          setSubCategories(response.data.subCategories);
          toast.success(response.data.message);
          setSubCategoryName("");
          setSubCategoryParent("");
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            const { data } = error.response;
            toast.error(data.message);
          } else {
            toast.error("Cannot update a Sub-category");
          }
        });
    } else {
      addSubCategory(subCategoryName, subCategoryParent)
        .then((response) => {
          setSubCategories(response.data.subCategories);
          toast.success(response.data.message);
          setSubCategoryName("");
          setSubCategoryParent("");
          handleClose();
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            const { data } = error.response;
            toast.error(data.message);
          } else {
            toast.error("Cannot add a Sub-category");
          }
        });
    }
  };

  console.log({ subCategoryName, subCategoryParent });

  useEffect(() => {
    if (subCategoryDetails) {
      setSubCategoryName(subCategoryDetails.name);
      setSubCategoryParent(subCategoryDetails.parent._id);
    }
  }, [subCategoryDetails]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openFormDialog}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          m={1}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {subCategoryDetails?._id
              ? "Sub-cateogry details"
              : "Create a Sub-category"}
          </DialogTitle>

          <IconButton aria-label="close" onClick={handleClose}>
            <MdClose />
          </IconButton>
        </Box>

        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={{
              subCategoryName,
              subCategoryParent,
            }}
            validationSchema={validate}
            onSubmit={() => handleSubmit()}
          >
            {(form) => {
              return (
                <Form>
                  <SingularSelect
                    name="subCategoryParent"
                    value={subCategoryParent}
                    data={categories}
                    placeholder="Select category"
                    handleChange={(e) => setSubCategoryParent(e.target.value)}
                  />
                  <AdminInput
                    type="text"
                    name="subCategoryName"
                    showLabel={true}
                    label="Sub-category name"
                    placeholder="Enter sub-category name"
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  />
                  <Box
                    mt={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    gap="1em"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleClose}
                      color="inherit"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      autoFocus
                    >
                      Save
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default SubCategoryFormDialog;
