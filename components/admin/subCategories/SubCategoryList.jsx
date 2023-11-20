import { useState } from "react";
import SubCategoriesTable from "./SubCategoriesTable";
import SubCategoryListItem from "./SubCategoryListItem";
import styles from "./styles.module.scss";
import SubCategoryFormDialog from "./SubCategoryFormDialog";

function SubCategoryList({ subCategories, setSubCategories, categories }) {
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const handleCreateSubCategory = () => {
    setOpenFormDialog(true);
  };

  // return (
  //   <div className={styles.categoryListContainer}>
  //     {subCategories.map((subCategory) => (
  //       <ul key={subCategory._id}>
  //         <SubCategoryListItem
  //           subCategory={subCategory}
  //           categories={categories}
  //           setSubCategories={setSubCategories}
  //         />
  //       </ul>
  //     ))}
  //   </div>
  // );

  return (
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
  );
}

export default SubCategoryList;
