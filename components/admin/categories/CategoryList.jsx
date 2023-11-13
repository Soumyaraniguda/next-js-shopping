import CategoryListItem from "./CategoryListItem";
import styles from "./styles.module.scss";

function CategoryList({ categories, setCategories }) {
  return (
    <div className={styles.categoryListContainer}>
      {categories.map((category) => (
        <ul key={category._id}>
          <CategoryListItem category={category} setCategories={setCategories} />
        </ul>
      ))}
    </div>
  );
}

export default CategoryList;
