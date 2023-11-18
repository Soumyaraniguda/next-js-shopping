import { useState } from "react";
import styles from "./styles.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "@/components/inputs/adminInput/AdminInput";
import { RiDeleteBin7Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { MdClose, MdDone } from "react-icons/md";
import {
  deleteCategory,
  deleteSubCategory,
  updateSubCategory,
} from "@/uiApiRequests/categories.api";
import { toast } from "react-toastify";
import SingularSelect from "@/components/inputs/select/SingularSelect";

function SubCategoryListItem({ subCategory, setSubCategories, categories }) {
  const [editMode, setEditMode] = useState(false);
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
    subCategoryParent: Yup.string().required("Please choose a parent category"),
  });

  const handleEnableEditMode = () => {
    setEditMode(true);
    setSubCategoryName(subCategory.name);
    setSubCategoryParent(subCategory.parent._id);
  };

  const handleSubmit = () => {
    updateSubCategory({
      id: subCategory._id,
      subCategoryName,
      subCategoryParent,
    })
      .then((response) => {
        setSubCategories(response.data.subCategories);
        toast.success(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.message);
        } else {
          toast.error("Sub-category not updated");
        }
      });
    setEditMode(false);
    setSubCategoryName("");
    setSubCategoryParent("");
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSubCategoryName("");
  };

  const handleDeleteSubCategory = () => {
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

  return (
    <li className={styles.categoryListItem}>
      {editMode ? (
        <Formik
          enableReinitialize
          initialValues={{
            subCategoryName,
            subCategoryParent,
          }}
          validationSchema={validate}
          onSubmit={() => handleSubmit()}
        >
          {(form) => (
            <Form style={{ width: "100%" }}>
              <div className={styles.categoryItemInput}>
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
                  label="Category name"
                  placeholder="Enter category name"
                  showLabel={false}
                  onChange={(e) => setSubCategoryName(e.target.value)}
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
          {subCategory.parent.name}
          {" -> "}
          {subCategory.name}{" "}
          <div className={styles.categoryItemActions}>
            <div
              className={styles.categoryItemActions_action}
              onClick={() => handleEnableEditMode()}
            >
              <AiOutlineEdit />
            </div>
            <div
              className={styles.categoryItemActions_action}
              onClick={handleDeleteSubCategory}
            >
              <RiDeleteBin7Line />
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default SubCategoryListItem;
