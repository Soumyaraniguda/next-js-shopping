import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput/AdminInput";
import { RiDeleteBin7Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { MdClose, MdDone } from "react-icons/md";
import { deleteCategory, updateCategory } from "@/uiApiRequests/categories.api";
import { toast } from "react-toastify";

function CategoryListItem({ category, setCategories }) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  const handleEnableEditMode = () => {
    setEditMode(true);
    setInputValue(category.name);
  };

  const handleSubmit = () => {
    updateCategory({ id: category._id, name: inputValue })
      .then((response) => {
        console.log({ response });
        setCategories(response.data.categories);
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.message);
        } else {
          toast.error("Category not updated");
        }
      });
    setEditMode(false);
    setInputValue("");
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setInputValue("");
  };

  const handleDeleteCategory = () => {
    deleteCategory(category._id)
      .then((response) => {
        setCategories(response.data.categories);
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

  return (
    <li className={styles.categoryListItem}>
      {editMode ? (
        <Formik
          enableReinitialize
          initialValues={{ categoryName: inputValue }}
          validationSchema={validate}
          onSubmit={() => handleSubmit()}
        >
          {(form) => (
            <Form style={{ width: "100%" }}>
              <div className={styles.categoryItemInput}>
                <AdminInput
                  type="text"
                  name="categoryName"
                  label="Category name"
                  placeholder="Enter category name"
                  showLabel={false}
                  onChange={(e) => setInputValue(e.target.value)}
                  stylesToOverride={{
                    border: "none",
                    height: "100%",
                    padding: "0 10px 0 0",
                    margin: "0",
                  }}
                />
                <div className={styles.categoryItemActions}>
                  <button
                    type="submit"
                    className={styles.categoryItemActions_saveAction}
                  >
                    <MdDone />
                  </button>
                  <button
                    onClick={() => handleCancelEdit()}
                    className={styles.categoryItemActions_cancelAction}
                  >
                    <MdClose />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className={styles.categoryItemDetails}>
          {category.name}{" "}
          <div className={styles.categoryItemActions}>
            <div
              className={styles.categoryItemActions_action}
              onClick={() => handleEnableEditMode()}
            >
              <AiOutlineEdit />
            </div>
            <div
              className={styles.categoryItemActions_action}
              onClick={handleDeleteCategory}
            >
              <RiDeleteBin7Line />
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default CategoryListItem;
