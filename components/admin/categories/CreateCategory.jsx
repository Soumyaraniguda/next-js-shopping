import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput/AdminInput";
import { toast } from "react-toastify";
import { addCategory } from "@/uiApiRequests/categories.api";

function CreateCategory({ setCategories }) {
  const [categoryName, setCategoryName] = useState("");

  const validate = Yup.object({
    categoryName: Yup.string()
      .required("Category name is required")
      .min(2, "Cateogy name must between 2 and 30 characters.")
      .max(30, "Cateogy name must between 2 and 30 characters")
      .matches(
        /^[A-Za-z\s]*$/,
        "Numbers and special characters are not allowed."
      ),
  });

  const handleSubmit = () => {
    addCategory(categoryName)
      .then((response) => {
        setCategories(response.data.categories);
        toast.success(response.data.message);
        setCategoryName("");
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.message);
        } else {
          toast.error("Cannot add a category");
        }
      });
  };

  return (
    <>
      <div className={styles.adminHeader}>Create a category</div>
      <div className={styles.adminForm}>
        <Formik
          enableReinitialize
          initialValues={{ categoryName }}
          validationSchema={validate}
          onSubmit={() => handleSubmit()}
        >
          {(form) => (
            <Form>
              <AdminInput
                type="text"
                name="categoryName"
                label="Category name"
                placeholder="Enter category name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <div className={styles.adminBtnWrap}>
                <button
                  type="submit"
                  className={`${styles.adminBtn} ${styles.adminBtn__primary}`}
                >
                  <span>Add Category</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CreateCategory;
