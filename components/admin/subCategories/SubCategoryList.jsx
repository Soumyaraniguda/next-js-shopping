import SubCategoryListItem from "./SubCategoryListItem";
import styles from "./styles.module.scss";

function SubCategoryList({ subCategories, setSubCategories, categories }) {
  return (
    <div className={styles.categoryListContainer}>
      {subCategories.map((subCategory) => (
        <ul key={subCategory._id}>
          <SubCategoryListItem
            subCategory={subCategory}
            categories={categories}
            setSubCategories={setSubCategories}
          />
        </ul>
      ))}
    </div>
  );
}

export default SubCategoryList;
