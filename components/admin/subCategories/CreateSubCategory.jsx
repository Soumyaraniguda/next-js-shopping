import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput/AdminInput";
import { toast } from "react-toastify";
import { addSubCategory } from "@/uiApiRequests/categories.api";
import SingularSelect from "@/components/inputs/select/SingularSelect";

function CreateSubCategory({ setSubCategories, categories }) {
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
    addSubCategory(subCategoryName, subCategoryParent)
      .then((response) => {
        setSubCategories(response.data.subCategories);
        toast.success(response.data.message);
        setSubCategoryName("");
        setSubCategoryParent("");
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
  };

  return (
    <>
      <div className={styles.adminHeader}>Create a Sub-category</div>
      <div className={styles.adminForm}>
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
                <div className={styles.adminBtnWrap}>
                  <button
                    type="submit"
                    className={`${styles.adminBtn} ${styles.adminBtn__primary}`}
                  >
                    <span>Add Sub-category</span>
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default CreateSubCategory;
