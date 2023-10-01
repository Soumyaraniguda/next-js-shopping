import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

function Category({ header, products, background }) {
  const isMedium = useMediaQuery({ query: "(max-width:1300px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products
          .slice(0, isMobile ? 6 : isMedium ? 4 : 6)
          .map((product, i) => (
            <div key={i} className={styles.product}>
              <Image
                src={product.image}
                alt=""
                sizes="100vw"
                height={0}
                width={0}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Category;
