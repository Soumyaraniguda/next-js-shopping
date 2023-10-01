import Link from "next/link";
import styles from "./page.module.scss";
import Image from "next/image";
import { MdFlashOn } from "react-icons/md";

function FlasDealsCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Link href={product.link}>
          {/* <img src={product.image} /> */}
          <Image
            src={product.image}
            height={0}
            width={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
        <div className={styles.flash}>
          <MdFlashOn />
          <span>-{product.discount}%</span>
        </div>
      </div>
      <div className={styles.card__price}>
        <span>
          USD{(product.price - product.price / product.discount).toFixed(2)}$
        </span>
        <span>
          -USD
          {(
            product.price -
            (product.price - product.price / product.discount)
          ).toFixed(2)}
          $
        </span>
      </div>
      <div className={styles.card__bar}>
        <div className={styles.card__bar_inner} style={{ width: "75%" }}>
          <div className={styles.card__percentage}>{product.sold}%</div>
        </div>
      </div>
    </div>
  );
}

export default FlasDealsCard;
