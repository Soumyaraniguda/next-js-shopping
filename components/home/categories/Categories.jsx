import Category from "./Category";
import styles from "./styles.module.scss";
import { women_accessories, women_dresses, women_shoes } from "@/data/home";
import { useMediaQuery } from "react-responsive";

function Categories() {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <div className={styles.categories}>
      <Category
        header="Dresses"
        products={women_dresses}
        background="#5a31f4"
      />
      {!isMedium || isMobile ? (
        <Category header="Shoes" products={women_shoes} background="#6cc070" />
      ) : (
        <></>
      )}

      <Category
        header="Accessories"
        products={women_accessories}
        background="#000"
      />
    </div>
  );
}

export default Categories;
